// KJS_WITH_FULL_RUNTIME
// EXPECTED_REACHABLE_NODES: 1292
// CHECK_DEBUGGER_COUNT: function=doResume count=1 TARGET_BACKENDS=JS
// CHECK_DEBUGGER_COUNT: function=doResume_0_k$ count=1 IGNORED_BACKENDS=JS

fun foo(f: suspend () -> Unit) {
}

fun box(): String {
    foo {
        println("aaa")
        js("debugger;")
        println("bbb")
    }
    return "OK"
}