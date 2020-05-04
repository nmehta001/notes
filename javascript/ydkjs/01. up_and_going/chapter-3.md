# Chapter 3 - Into YDKJS

---

## Scope & Closures

---

- JS is not an interpreted language (common misconception)
- JS variable scope management - **_'hoisting'_**
- The application of Closure in the module pattern (most prevalent use of closure and pattern)

## this & Object Prototypes

---

- `this` keyword does not refer to the function it is used in. It is dynamically bound based on how the function is executed. It has 4 simple rules
- The `Object` prototype mechanism is a lookup chain for properties, similar to how lexical scope variables are found
- However what is wrapped up in the prototypes is not the emulation of classes or the inheritance (prototypal)
- Prototypes work on the principal of **_'behaviour delegation'_**

## Types & Grammar

---

- Implicit and Explicit Coercion
- Implicit is not inherently a bad thing, in the cases where it is needed it is sensible and more often than not useful

## Async & Performance

---

- **_async_**, **_parallel_**, **_concurrent_** are all terms that are used within the realm of JS but there is a lot of confusion around them
- Callbacks are the primary method of enabling asynchrony, however it has deficiencies
  - Inversion of Control (IoC) trust loss
  - lack of linear reason-ability
- To address the above, ES6 introduces two new mechanisms (also patterns) [[ promises](#promises), [generators](#generators) ]
- Combining both promises and generators yields the most effective coding pattern to date in JS. Much of the sophistication surrounding asynchrony in ES7 and later based on this

<a name='promises'>**Promises**</a>

---

A time-independent wrapper around a 'future value', which lets you reason about and compose them regardless of the readiness of the value. It solves the IoC trust issue by routing callbacks through a trustable and composable promise mechanism

<a name='generators'> **Generators** </a>

---

A new mode of execution for functions. It can be paused at `yield` points and be resumed asynchronously later. This pause-and-resume capability ensures synchronous, sequential-looking code can be process asynchronously.

## ES6 & Beyond

---

- ES6 focuses on fixing some of the shortfalls of ES5 and below as well as new processing capabilities and and APIs.
