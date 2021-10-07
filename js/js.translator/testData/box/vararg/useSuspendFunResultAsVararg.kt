// CALL_MAIN

class TodoItem(var value: String, var completed: Boolean) {
    override fun toString(): String {
        return "TodoItem(value='$value', completed=$completed)"
    }
}

suspend fun getFromApi(): TodoItem {
    return TodoItem("Test", false)
}

fun emulateLog(vararg strings: String): String {
    return strings[0]
}

var stringifiedResult: String = "";

suspend fun main() {
    stringifiedResult = emulateLog("Result: " + getFromApi())
}

fun box(): String {
    assertEquals(stringifiedResult, "Result: TodoItem(value='Test', completed=false)")
    return "OK"
}