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

class C {
    inline fun <reified T: String> qux(value: T): String = "OK" + value
}

fun test2(): String {
    val c = C()
    val cr: (String) -> String = c::qux
    return cr("456")
}

inline fun <reified T: Any> ((Any) -> String).cux(value: T): String = this(value)

fun test3(): String {
    val foo: (Any) -> String = ({ b: Any ->
        val a: (Any) -> String = ::baz
        a(b)
    })::cux
    return foo(3)
}

fun box(): String {
    val test1 = test()
    if (test1 != "OK1") return "fail1: $test1"
    val test2 = foo()
    if (test2 != "123OK") return "fail2: $test2"
    val test3 = bar()
    if (test3 != "321OK") return "fail3: $test3"
    val test4 = test2()
    if (test4 != "OK456") return "fail4: $test4"

    val test5 = test3()
    if (test5 != "OK3") return "fail5: $test5"

    return "OK"
}
