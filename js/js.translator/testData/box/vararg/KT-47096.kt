// CALL_MAIN

suspend fun getFromApi(): TodoItem {
    val response = js("{ title: 'Test', completed: false }")
    return TodoItem.fromRawTodoItem(response)
}

class TodoItem(var value: String, var completed: Boolean) {

    companion object {
        fun fromRawTodoItem(raw: dynamic) = TodoItem(raw.title, raw.completed)
    }
    override fun toString(): String {
        return "TodoItem(value='$value', completed=$completed)"
    }
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