/*
 * Copyright 2010-2019 JetBrains s.r.o. and Kotlin Programming Language contributors.
 * Use of this source code is governed by the Apache 2.0 license that can be found in the license/LICENSE.txt file.
 */

package org.jetbrains.kotlin.backend.wasm

import org.jetbrains.kotlin.backend.common.phaser.PhaseConfig
import org.jetbrains.kotlin.backend.common.phaser.invokeToplevel
import org.jetbrains.kotlin.backend.wasm.ir2wasm.WasmCompiledModuleFragment
import org.jetbrains.kotlin.backend.wasm.ir2wasm.WasmModuleFragmentGenerator
import org.jetbrains.kotlin.ir.backend.js.MainModule
import org.jetbrains.kotlin.ir.backend.js.ModulesStructure
import org.jetbrains.kotlin.ir.backend.js.loadIr
import org.jetbrains.kotlin.ir.declarations.IrFactory
import org.jetbrains.kotlin.ir.util.ExternalDependenciesGenerator
import org.jetbrains.kotlin.ir.util.noUnboundLeft
import org.jetbrains.kotlin.ir.util.patchDeclarationParents
import org.jetbrains.kotlin.name.FqName
import org.jetbrains.kotlin.wasm.ir.convertors.WasmIrToBinary
import org.jetbrains.kotlin.wasm.ir.convertors.WasmIrToText
import java.io.ByteArrayOutputStream

class WasmCompilerResult(val wat: String, val js: String, val wasm: ByteArray)

fun compileWasm(
    depsDescriptors: ModulesStructure,
    phaseConfig: PhaseConfig,
    irFactory: IrFactory,
    exportedDeclarations: Set<FqName> = emptySet(),
    emitNameSection: Boolean = false,
): WasmCompilerResult {
    val mainModule = depsDescriptors.mainModule
    val configuration = depsDescriptors.compilerConfiguration
    val (moduleFragment, dependencyModules, irBuiltIns, symbolTable, deserializer) = loadIr(
        depsDescriptors,
        irFactory,
        verifySignatures = false,
        loadFunctionInterfacesIntoStdlib = true,
    )

    val allModules = when (mainModule) {
        is MainModule.SourceFiles -> dependencyModules + listOf(moduleFragment)
        is MainModule.Klib -> dependencyModules
    }

    val moduleDescriptor = moduleFragment.descriptor
    val context = WasmBackendContext(moduleDescriptor, irBuiltIns, symbolTable, moduleFragment, exportedDeclarations, configuration)

    // Load declarations referenced during `context` initialization
    allModules.forEach {
        ExternalDependenciesGenerator(symbolTable, listOf(deserializer)).generateUnboundSymbolsAsDependencies()
    }

    // Preloading function interfaces that will potentially be referenced by IR lowering.
    // TODO: Do a smart preload based on what references we have in IR and support big arity
    repeat(22) {
        irBuiltIns.functionN(it)
        irBuiltIns.kFunctionN(it)
        irBuiltIns.kSuspendFunctionN(it)
        irBuiltIns.suspendFunctionN(it)
    }

    val irFiles = allModules.flatMap { it.files }
    moduleFragment.files.clear()
    moduleFragment.files += irFiles

    // Create stubs
    ExternalDependenciesGenerator(symbolTable, listOf(deserializer)).generateUnboundSymbolsAsDependencies()
    moduleFragment.patchDeclarationParents()

    deserializer.postProcess()
    symbolTable.noUnboundLeft("Unbound symbols at the end of linker")

    wasmPhases.invokeToplevel(phaseConfig, context, moduleFragment)

    val compiledWasmModule = WasmCompiledModuleFragment(context.irBuiltIns)
    val codeGenerator = WasmModuleFragmentGenerator(context, compiledWasmModule)
    codeGenerator.generateModule(moduleFragment)

    val linkedModule = compiledWasmModule.linkWasmCompiledFragments()
    val watGenerator = WasmIrToText()
    watGenerator.appendWasmModule(linkedModule)
    val wat = watGenerator.toString()

    val js = compiledWasmModule.generateJs()

    val os = ByteArrayOutputStream()
    WasmIrToBinary(os, linkedModule, moduleDescriptor.name.asString(), emitNameSection).appendWasmModule()
    val byteArray = os.toByteArray()

    return WasmCompilerResult(
        wat = wat,
        js = js,
        wasm = byteArray
    )
}


fun WasmCompiledModuleFragment.generateJs(): String {
    val runtime = """
    var wasmInstance = null;
    
    const runtime = {
        identity(x) {
            return x;
        },

        println(valueAddr) {
            console.log(">>>  " + importStringFromWasm(valueAddr));
        }
    };
    
    function importStringFromWasm(addr) {
        const mem16 = new Uint16Array(wasmInstance.exports.memory.buffer);
        const mem32 = new Int32Array(wasmInstance.exports.memory.buffer);
        const len = mem32[addr / 4];
        const str_start_addr = (addr + 4) / 2;
        const slice = mem16.slice(str_start_addr, str_start_addr + len);
        return String.fromCharCode.apply(null, slice);
    }
    """.trimIndent()

    val jsCode =
        "\nconst js_code = {${jsFuns.joinToString(",\n") { "\"" + it.importName + "\" : " + it.jsCode }}};"

    return runtime + jsCode
}
