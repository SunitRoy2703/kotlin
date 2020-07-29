/*
 * Copyright 2000-2018 JetBrains s.r.o. and Kotlin Programming Language contributors.
 * Use of this source code is governed by the Apache 2.0 license that can be found in the license/LICENSE.txt file.
 */

package org.jetbrains.kotlin.ir.declarations

import org.jetbrains.kotlin.descriptors.PropertyDescriptor
import org.jetbrains.kotlin.ir.ObsoleteDescriptorBasedAPI
import org.jetbrains.kotlin.ir.expressions.IrExpressionBody
import org.jetbrains.kotlin.ir.symbols.IrFieldSymbol
import org.jetbrains.kotlin.ir.symbols.IrPropertySymbol
import org.jetbrains.kotlin.ir.types.IrType
import org.jetbrains.kotlin.ir.visitors.IrElementTransformer
import org.jetbrains.kotlin.ir.visitors.IrElementVisitor

interface IrField :
    IrSymbolDeclaration<IrFieldSymbol>,
    IrDeclarationWithName, IrDeclarationWithVisibility, IrDeclarationParent, IrMetadataSourceOwner {

    @ObsoleteDescriptorBasedAPI
    override val descriptor: PropertyDescriptor

    val type: IrType
    val isFinal: Boolean
    val isExternal: Boolean
    val isStatic: Boolean

    var initializer: IrExpressionBody?

    var correspondingPropertySymbol: IrPropertySymbol?

    override fun <R, D> accept(visitor: IrElementVisitor<R, D>, data: D): R =
        visitor.visitField(this, data)

    override fun <D> acceptChildren(visitor: IrElementVisitor<Unit, D>, data: D) {
        initializer?.accept(visitor, data)
    }

    override fun <D> transformChildren(transformer: IrElementTransformer<D>, data: D) {
        initializer = initializer?.transform(transformer, data)
    }
}
