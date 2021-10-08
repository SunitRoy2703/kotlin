// IGNORE_BACKEND: WASM

inline fun <reified T> baz(value: T): String = "OK" + value

fun test(): String {
    val f: (Any) -> String = ::baz
    return f(1)
}

object Foo {
    val log = "123"
}

public inline fun <reified T> Foo.foo(value: T): String =
    log + value

val foo = { "OK".let(Foo::foo) }

object Bar {
    val log = "321"

    public inline fun <reified T> bar(value: T): String =
        log + value
}

val bar = { "OK".let(Bar::bar) }

fun box(): String {
    val test1 = test()
    if (test1 != "OK1") return "fail1: $test1"
    val test2 = foo()
    if (test2 != "123OK") return "fail2: $test2"
    val test3 = bar()
    if (test3 != "321OK") return "fail3: $test3"

    return "OK"
}
