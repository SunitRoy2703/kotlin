// TARGET_BACKEND: JVM
// WITH_RUNTIME

import kotlin.jvm.internal.unsafe.*

@Suppress("INVISIBLE_MEMBER")
fun box(): String {
    val lock = Any()
    monitorEnter(lock)
    try {
        return "OK"
    }
    finally {
        monitorExit(lock)
    }
}
