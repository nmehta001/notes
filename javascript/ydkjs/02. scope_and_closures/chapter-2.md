## Chapter 2 - Lexical Scope

---

- Two predominant models for how scope works

  - Lexical scope (used by JS)
  - Dynamic scope (providing contrast)

### Lex time

---

Lexical scope is based on where the scope is defined at lexing time. In this instance each function creates a new scope

```javascript
// scope 1

const foo = (a) => {
  // scope 2
  const b = a * 2;

  const bar = (c) => {
    // scope 3
    console.log(a, b, c);
  };

  bar(b * 3);
};

foo(2);
```

The above example has three distinct scopes:

- scope 1: This is the global scope, it has only one identifier (`foo`)
- scope 2: This is the scope of foo, three identifiers (`a`, `b`, `bar`)
- scope 3: This is the scope of bar, it has only one identifier (`c`)

What we can conclude from this is that `bar` is nested within the scope of `foo` only because that is where it was placed

### Look-ups

---

When performing look-ups, the structure and relative placement of each scope tells the engine all the places it needs to look to find an identifier. A brief walk-through would be as follows:

- The engine will look at the `...log` and then go off to find the three referenced variables
- It starts within `bar`, it will not find the variable `a` so it explores the next outer scope
- It will find both `a` and `b` in the next outer scope relative to `bar`
- `c` however is within bar, so it does not need to explore the outer scope to find it
  - Had `c` been declared in both `bar` and `foo`, the engine would have used the one inside `bar`. Scope look-ups stop after the first match

No matter where or how a function is invoked, its lexical scope is relative to where it was declared.

### Cheating Lexical

---

There are two mechanisms that allow for cheating the scope, it should be noted that cheating the scope is bad practice and that it leads to poorer performance:

- [eval](#eval)
- [with](#with)

<a name="eval">Eval</a>

---

`eval(...)` is a function that take a string as an argument, it treats the string as code that had been authored at the time of usage in the program.

```javascript
const foo = (str, a) => {
  eval(str);
  console.log(a, b);
};

const b = 2;

foo("const b = 3;", 2);
```

Considering that `b` was created outside the scope of `foo`. We would expect the global scope that contains `b` to be `2`. The engine will not care that the lexical scope was modified and will perform its lookups as usual; `b` is now in the scope of foo, this becomes the first match and the scope will stop here.

<a name="with">With</a>

---

`with(...)` is explained as shorthand for changing multiple property references without object reference repetition.

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

// tedious
obj.a = 2;
obj.b = 3;
obj.c = 4;

// 'easier' short-hand
with (obj) {
  a = 3;
  b = 4;
  c = 5;
}
```

Now consider:

```javascript
const foo = (obj) => {
  with (obj) {
    a = 2;
  }
};

const o1 = { a: 3 };

const o2 = { b: 3 };

foo(o1);
console.log(o1.a); // 2

foo(o2);
console.log(o2.a); // undefined
console.log(a); // leaked global
```

- `o1.a` should be changed to 2
- `o2.a` does not exist and therefore the property will never be set
- There is now a global `a` that was never defined

What has happened is that `with` takes an object and creates an entirely new scope with that object. Tying this back to look-ups, as `o1.a` exists so there is no need to do anything, just assign the value. Conversely `o2.a` does not exist in any scope, so the normal LHS rule applies, `a` is created in the global scope for `o2`.

### Performance

---

JS performs a number of optimisations during the compilation phase that are based on:

- Statically analysing code
- Pre-determining where all variable and function declarations are

This is done to take less effort to resolve identifiers during execution

If the engine finds an `eval(...)` or a `with(...)`, it has to assume that everything it knew before may be invalid. Not knowing what was passed to eval or the contents of the object before passing it to with, the engine will abandon the optimisations and execute as is.
