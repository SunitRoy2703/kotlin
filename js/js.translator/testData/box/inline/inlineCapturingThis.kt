// EXPECTED_REACHABLE_NODES: 1286
package foo

// CHECK_CONTAINS_NO_CALLS: test TARGET_BACKENDS=JS
// CHECK_CONTAINS_NO_CALLS: test_0_k$ except=Unit_getInstance IGNORED_BACKENDS=JS

inline fun block(p: () -> Unit) = p()

class A(val x: Int) {
    fun test(): Int {
        var result: Int = 0
        block {
            result = x
        }
        return result
    }
}

fun box(): String {
    assertEquals(23, A(23).test())

    return "OK"
}