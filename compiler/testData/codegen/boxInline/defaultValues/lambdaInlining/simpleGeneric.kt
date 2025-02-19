// SKIP_INLINE_CHECK_IN: inlineFun$default
// FILE: 1.kt
package test

open class A(val value: String)

class B(value: String): A(value)

inline fun <T : A> inlineFun(capturedParam: T, lambda: () -> T = { capturedParam }): T {
    return lambda()
}

// FILE: 2.kt
// CHECK_CONTAINS_NO_CALLS: box TARGET_BACKENDS=JS
// CHECK_CONTAINS_NO_CALLS: box except=_get_value__0_k$ IGNORED_BACKENDS=JS

import test.*

fun box(): String {
    return inlineFun(B("O")).value + inlineFun(A("K")).value
}
