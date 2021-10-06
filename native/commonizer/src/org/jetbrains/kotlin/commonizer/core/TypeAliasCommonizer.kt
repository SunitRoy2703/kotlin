/*
 * Copyright 2010-2019 JetBrains s.r.o. and Kotlin Programming Language contributors.
 * Use of this source code is governed by the Apache 2.0 license that can be found in the license/LICENSE.txt file.
 */

package org.jetbrains.kotlin.commonizer.core

import org.jetbrains.kotlin.commonizer.cir.CirClassOrTypeAliasType
import org.jetbrains.kotlin.commonizer.cir.CirTypeAlias
import org.jetbrains.kotlin.commonizer.cir.expandedType

class TypeAliasCommonizer(
    typeCommonizer: TypeCommonizer,
) : NullableSingleInvocationCommonizer<CirTypeAlias> {

    private val typeCommonizer = typeCommonizer.withOptions {
        withBackwardsTypeAliasSubstitutionEnabled(false)
    }

    override fun invoke(values: List<CirTypeAlias>): CirTypeAlias? {
        if (values.isEmpty()) return null

        val name = values.map { it.name }.distinct().singleOrNull() ?: return null

        val typeParameters = TypeParameterListCommonizer(typeCommonizer).commonize(values.map { it.typeParameters }) ?: return null

        val underlyingType = typeCommonizer.invoke(values.map { it.underlyingType }) as? CirClassOrTypeAliasType ?: return null

        val visibility = VisibilityCommonizer.lowering().commonize(values) ?: return null

        return CirTypeAlias.create(
            name = name,
            typeParameters = typeParameters,
            visibility = visibility,
            underlyingType = underlyingType,
            expandedType = underlyingType.expandedType(),
            annotations = emptyList(),
        )
    }
}
