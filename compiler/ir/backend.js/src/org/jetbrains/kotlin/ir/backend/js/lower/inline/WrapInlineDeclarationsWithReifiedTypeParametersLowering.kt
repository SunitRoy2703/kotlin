/*
 * Copyright 2010-2021 JetBrains s.r.o. and Kotlin Programming Language contributors.
 * Use of this source code is governed by the Apache 2.0 license that can be found in the license/LICENSE.txt file.
 */

/*
 * Copyright 2010-2021 JetBrains s.r.o. and Kotlin Programming Language contributors.
 * Use of this source code is governed by the Apache 2.0 license that can be found in the license/LICENSE.txt file.
 */

package org.jetbrains.kotlin.ir.backend.js.lower.inline

import org.jetbrains.kotlin.backend.common.BodyLoweringPass
import org.jetbrains.kotlin.descriptors.DescriptorVisibilities
import org.jetbrains.kotlin.ir.backend.js.JsIrBackendContext
import org.jetbrains.kotlin.ir.backend.js.ir.JsIrBuilder
import org.jetbrains.kotlin.ir.backend.js.utils.isInlineFunWithReifiedParameter
import org.jetbrains.kotlin.ir.builders.declarations.addFunction
import org.jetbrains.kotlin.ir.builders.declarations.addValueParameter
import org.jetbrains.kotlin.ir.declarations.IrDeclaration
import org.jetbrains.kotlin.ir.declarations.IrDeclarationContainer
import org.jetbrains.kotlin.ir.declarations.IrSimpleFunction
import org.jetbrains.kotlin.ir.expressions.IrBody
import org.jetbrains.kotlin.ir.expressions.IrExpression
import org.jetbrains.kotlin.ir.expressions.IrFunctionReference
import org.jetbrains.kotlin.ir.expressions.impl.IrFunctionReferenceImpl
import org.jetbrains.kotlin.ir.symbols.IrTypeParameterSymbol
import org.jetbrains.kotlin.ir.types.IrType
import org.jetbrains.kotlin.ir.types.classifierOrNull
import org.jetbrains.kotlin.ir.util.render
import org.jetbrains.kotlin.ir.visitors.IrElementTransformerVoid
import org.jetbrains.kotlin.ir.visitors.transformChildrenVoid
import org.jetbrains.kotlin.name.Name

class WrapInlineDeclarationsWithReifiedTypeParametersLowering(val context: JsIrBackendContext) : BodyLoweringPass {
    private val irFactory
        get() = context.irFactory

    override fun lower(irBody: IrBody, container: IrDeclaration) {
        irBody.transformChildrenVoid(object : IrElementTransformerVoid() {
            override fun visitFunctionReference(expression: IrFunctionReference): IrExpression {
                expression.transformChildrenVoid()

                val owner = expression.symbol.owner as? IrSimpleFunction
                    ?: return expression

                if (!owner.isInlineFunWithReifiedParameter()) {
                    return expression
                }

                val function = irFactory.addFunction(container.parent as IrDeclarationContainer) {
                    name = Name.identifier("${owner.name}${"$"}wrap")
                    returnType = owner.returnType
                    visibility = DescriptorVisibilities.PRIVATE
                    origin = JsIrBuilder.SYNTHESIZED_DECLARATION
                }.also { function ->
                    owner.valueParameters.forEach { valueParameter ->
                        val classifier = valueParameter.type.classifierOrNull
                        val type: IrType = if (classifier is IrTypeParameterSymbol) {
                            val index = classifier.owner.index
                            expression.getTypeArgument(index)
                                ?: error("Expression must have type argument with index $index: ${expression.render()}")
                        } else {
                            valueParameter.type
                        }
                        function.addValueParameter(
                            valueParameter.name,
                            type
                        )
                    }
                    function.body = irFactory.createBlockBody(
                        owner.startOffset,
                        owner.endOffset
                    ) {
                        statements.add(
                            JsIrBuilder.buildReturn(
                                function.symbol,
                                JsIrBuilder.buildCall(owner.symbol).also { call ->
                                    call.dispatchReceiver = expression.dispatchReceiver
                                    call.extensionReceiver = expression.extensionReceiver
                                    function.valueParameters.forEachIndexed { index, valueParameter ->
                                        call.putValueArgument(index, JsIrBuilder.buildGetValue(valueParameter.symbol))
                                    }
                                    for (i in 0 until expression.typeArgumentsCount) {
                                        call.putTypeArgument(i, expression.getTypeArgument(i))
                                    }
                                },
                                owner.returnType
                            )
                        )
                    }
                }
                return IrFunctionReferenceImpl.fromSymbolOwner(
                    expression.startOffset,
                    expression.endOffset,
                    expression.type,
                    function.symbol,
                    function.typeParameters.size,
                    expression.reflectionTarget
                )
            }
        })
    }
}