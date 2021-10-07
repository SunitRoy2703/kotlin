/*
 * Copyright 2010-2021 JetBrains s.r.o. and Kotlin Programming Language contributors.
 * Use of this source code is governed by the Apache 2.0 license that can be found in the license/LICENSE.txt file.
 */

package org.jetbrains.kotlin.backend.konan.llvm

import kotlinx.cinterop.allocArray
import kotlinx.cinterop.get
import kotlinx.cinterop.memScoped
import llvm.*
import org.jetbrains.kotlin.backend.konan.Context
import org.jetbrains.kotlin.backend.konan.RuntimeNames
import org.jetbrains.kotlin.backend.konan.ir.llvmSymbolOrigin
import org.jetbrains.kotlin.descriptors.konan.CompiledKlibModuleOrigin
import org.jetbrains.kotlin.ir.declarations.IrConstructor
import org.jetbrains.kotlin.ir.declarations.IrFunction
import org.jetbrains.kotlin.ir.types.isNothing
import org.jetbrains.kotlin.ir.util.hasAnnotation
import org.jetbrains.kotlin.ir.util.isThrowable

/**
 * Add attributes to LLVM function declaration and its invocation.
 */
interface LlvmFunctionAttributeProvider {

    val llvmReturnType: LLVMTypeRef

    val llvmFunctionType: LLVMTypeRef

    fun addCallSiteAttributes(callSite: LLVMValueRef)

    fun addFunctionAttributes(function: LLVMValueRef)

    companion object {
        fun makeEmpty(functionType: LLVMTypeRef): LlvmFunctionAttributeProvider =
                DummyLlvmFunctionAttributeProvider(functionType)

        fun copyFromExternal(externalFunction: LLVMValueRef): LlvmFunctionAttributeProvider =
                LlvmFunctionAttributesCopier(externalFunction)
    }
}

private class DummyLlvmFunctionAttributeProvider(functionType: LLVMTypeRef) : LlvmFunctionAttributeProvider {
    override fun addCallSiteAttributes(callSite: LLVMValueRef) {}

    override fun addFunctionAttributes(function: LLVMValueRef) {}

    override val llvmReturnType: LLVMTypeRef =
            functionType

    override val llvmFunctionType: LLVMTypeRef =
            LLVMGetReturnType(functionType)!!
}

/**
 * Copies attributes from the given [externalFunction].
 * This is useful when the [externalFunction] is declared in the another LLVM module,
 * and we want to create an external declaration for it.
 */
private class LlvmFunctionAttributesCopier(private val externalFunction: LLVMValueRef) : LlvmFunctionAttributeProvider {

    override val llvmFunctionType: LLVMTypeRef by lazy {
        getFunctionType(externalFunction)
    }

    override val llvmReturnType: LLVMTypeRef by lazy {
        LLVMGetReturnType(llvmFunctionType)!!
    }

    override fun addCallSiteAttributes(callSite: LLVMValueRef) {
        for (index in LLVMAttributeFunctionIndex..LLVMCountParams(externalFunction)) {
            copyAttributesAtIndex(index) { attributeRef ->
                LLVMAddCallSiteAttribute(callSite, index, attributeRef)
            }
        }
    }

    private inline fun copyAttributesAtIndex(index: Int, applyAttribute: (LLVMAttributeRef) -> Unit) {
        val count = LLVMGetAttributeCountAtIndex(externalFunction, index)
        memScoped {
            val attributes = allocArray<LLVMAttributeRefVar>(count)
            LLVMGetAttributesAtIndex(externalFunction, index, attributes)
            (0 until count).forEach {
                applyAttribute(attributes[it]!!)
            }
        }
    }

    override fun addFunctionAttributes(function: LLVMValueRef) {
        for (index in LLVMAttributeFunctionIndex..LLVMCountParams(externalFunction)) {
            copyAttributesAtIndex(index) { attributeRef ->
                LLVMAddAttributeAtIndex(function, index, attributeRef)
            }
        }
    }
}

private fun addCallSiteAttributesAtIndex(context: LLVMContextRef, callSite: LLVMValueRef, index: Int, attributes: List<LlvmAttribute>) {
    attributes.forEach { attribute ->
        val llvmAttributeRef = createLlvmEnumAttribute(context, attribute.asAttributeKindId())
        LLVMAddCallSiteAttribute(callSite, index, llvmAttributeRef)
    }
}

private fun addDeclarationAttributesAtIndex(context: LLVMContextRef, function: LLVMValueRef, index: Int, attributes: List<LlvmAttribute>) {
    attributes.forEach { attribute ->
        val llvmAttributeRef = createLlvmEnumAttribute(context, attribute.asAttributeKindId())
        LLVMAddAttributeAtIndex(function, index, llvmAttributeRef)
    }
}

/**
 * LLVM function's signature, enriched with attributes.
 */
internal open class LlvmFunctionSignature(
        val returnType: LlvmRetType,
        val parameterTypes: List<LlvmParamType> = emptyList(),
        val isVararg: Boolean = false,
        val functionAttributes: List<LlvmFunctionAttribute> = emptyList(),
) : LlvmFunctionAttributeProvider {

    constructor(irFunction: IrFunction, contextUtils: ContextUtils) : this(
            returnType = contextUtils.getLlvmFunctionReturnType(irFunction),
            parameterTypes = contextUtils.getLlvmFunctionParameterTypes(irFunction),
            functionAttributes = inferFunctionAttributes(contextUtils, irFunction),
            isVararg = false,
    )

    override val llvmFunctionType by lazy {
        functionType(returnType.llvmType, isVararg, parameterTypes.map { it.llvmType })
    }

    override val llvmReturnType: LLVMTypeRef =
            returnType.llvmType

    override fun addCallSiteAttributes(callSite: LLVMValueRef) {
        val caller = LLVMGetBasicBlockParent(LLVMGetInstructionParent(callSite))
        val llvmContext = LLVMGetModuleContext(LLVMGetGlobalParent(caller))!!
        addCallSiteAttributesAtIndex(llvmContext, callSite, LLVMAttributeFunctionIndex, functionAttributes)
        addCallSiteAttributesAtIndex(llvmContext, callSite, LLVMAttributeReturnIndex, returnType.attributes)
        repeat(parameterTypes.count()) {
            addCallSiteAttributesAtIndex(llvmContext, callSite, it + 1, parameterTypes[it].attributes)
        }
    }

    override fun addFunctionAttributes(function: LLVMValueRef) {
        val llvmContext = LLVMGetModuleContext(LLVMGetGlobalParent(function))!!
        addDeclarationAttributesAtIndex(llvmContext, function, LLVMAttributeFunctionIndex, functionAttributes)
        addDeclarationAttributesAtIndex(llvmContext, function, LLVMAttributeReturnIndex, returnType.attributes)
        repeat(parameterTypes.count()) {
            addDeclarationAttributesAtIndex(llvmContext, function, it + 1, parameterTypes[it].attributes)
        }
    }
}

/**
 * Prototype of a LLVM function that is not tied to a specific LLVM module.
 */
internal class LlvmFunctionProto(
        val name: String,
        returnType: LlvmRetType,
        parameterTypes: List<LlvmParamType> = emptyList(),
        functionAttributes: List<LlvmFunctionAttribute> = emptyList(),
        val origin: CompiledKlibModuleOrigin,
        isVararg: Boolean = false,
        val independent: Boolean = false,
) : LlvmFunctionSignature(returnType, parameterTypes, isVararg, functionAttributes) {
    constructor(
            name: String,
            signature: LlvmFunctionSignature,
            origin: CompiledKlibModuleOrigin,
            independent: Boolean = false,
    ) : this(name, signature.returnType, signature.parameterTypes, signature.functionAttributes, origin, signature.isVararg, independent)

    constructor(irFunction: IrFunction, symbolName: String, contextUtils: ContextUtils) : this(
            name = symbolName,
            returnType = contextUtils.getLlvmFunctionReturnType(irFunction),
            parameterTypes = contextUtils.getLlvmFunctionParameterTypes(irFunction),
            functionAttributes = inferFunctionAttributes(contextUtils, irFunction),
            origin = irFunction.llvmSymbolOrigin,
            independent = irFunction.hasAnnotation(RuntimeNames.independent)
    )
}

private fun mustNotInline(context: Context, irFunction: IrFunction): Boolean {
    if (context.shouldContainLocationDebugInfo()) {
        if (irFunction is IrConstructor && irFunction.isPrimary && irFunction.returnType.isThrowable()) {
            // To simplify skipping this constructor when scanning call stack in Kotlin_getCurrentStackTrace.
            return true
        }
    }

    return false
}

private fun inferFunctionAttributes(contextUtils: ContextUtils, irFunction: IrFunction): List<LlvmFunctionAttribute> =
        mutableListOf<LlvmFunctionAttribute>().apply {
            if (irFunction.returnType.isNothing()) {
                add(LlvmFunctionAttribute.NoReturn)
            }
            if (mustNotInline(contextUtils.context, irFunction)) {
                add(LlvmFunctionAttribute.NoInline)
            }
        }