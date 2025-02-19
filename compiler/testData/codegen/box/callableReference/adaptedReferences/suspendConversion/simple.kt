// IGNORE_BACKEND: WASM
// WASM_MUTE_REASON: COROUTINES
// !LANGUAGE: +SuspendConversion
// WITH_RUNTIME
// WITH_COROUTINES

import helpers.*
import kotlin.coroutines.*
import kotlin.coroutines.intrinsics.*


fun runSuspend(c: suspend () -> Unit) {
    c.startCoroutine(EmptyContinuation)
}

var test = "failed"

fun foo() { test = "OK" }

fun box(): String {
    runSuspend(::foo)
    return test
}