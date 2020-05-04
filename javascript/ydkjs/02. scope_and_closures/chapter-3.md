# Chapter 3 - Function Versus Block Scope

---

- Scope consists of a series of 'bubbles' that each act as a container
- So far functions can create scopes

## Scope from Functions

---

```javascript
const foo = (a) => {
  const b = 2;

  const bar = () => {
    //
  };

  const c = 3;
};
```

- The scope bubble for foo has identifiers for `a`, `b`, `bar` and `c`.
- Order is not important, functions and variables belong to the same scope. none of the identifiers are accessible outside of `foo`.
- `bar` has its own scope; the global scope does too and has a single identifier `foo`.

Function Scope encourages the idea that all variables belong to the function, they can be used and reused throughout the entirety of the function. Nested scopes will have access to the variables as well.

## Hiding in Plain Scope

---

The traditional way of thinking is writing a function and declaring code inside. Thinking inversely is the equally as powerful, taking arbitrary code and wrapping it inside a function 'hides' it.

- Principle of Least Privilege is where the idea comes to life, you only expose what is necessary
  - If all variables and functions are available to the global scope then this would violate the least principle

```javascript
const doSomething = (a) => {
  b = a + doSomethingElse(a * 2);

  console.log(b * 3);
};

const doSomethingElse = (a) => a - 1;

let b;

doSomething(2); // 15
```

- A lot of the code is declared in the global scope
- Most of it would be better contained to the `doSomething` function

```javascript
const doSomething = (a) => {
  const doSomethingElse = (a) => a - 1;

  let b;

  b = a + doSomethingElse(a * 2);

  console.log(b * 3);
};

doSomething(2); //15
```

- `doSomethingElse` and `b` are now not accessible to any outside influence
- Keeping private details private is the preferred software pattern

## Collision Avoidance

---

- Hiding variables and functions inside a scope avoids collisions between identifiers with the same name but having different intended purposes.

```javascript
const foo = () => {
  const bar = (a) => {
    i = 3;
    console.log(a + i);
  };

  for (let i = 0; i < 10; i++) {
    bar(i * 2);
  }
};

foo();
```

- In assigning `i = 3`, this effectively creates an infinite loop. When bar is called in the for loop, it has access to the identifier `i`. By using `const i = 3`, this is avoided and shadows the variable.

### Global namespaces

- Multiple libraries can cause collisions if their variables are declared in the global scope and are not properly scoped to hide their private variables and functions

### Module management

- Using the module approach for dependency management ensures that no libraries ever add identifiers to the global scope, but are required to have their identifier(s) be explicitly imported into another specific scope

## Functions as Scopes

---

Wrapping a function around any snippet of code 'hides' enclosed variable or function declarations from the outside scope, however, the example below could be written a bit better:

```javascript
const a = 2;

const foo = () => {
  const a = 3;
  console.log(a); // 3
};

foo();

console.log(a); // 2
```

- Declaring foo, pollutes the enclosing (global) scope with an identifier
- Explicitly calling foo so that the code executes

It would be ideal if the function didn't need a name (the name doesn't pollute the enclosing scope) and that it could be immediately executed

```javascript
const a = 2;

(() => {
  const a = 3;
  console.log(a); // 3
})();

console.log(a); // 2
```

- The function is immediately invoked (Immediately Invoked Function Expression (IIFE))
- The function is anonymous, it has no identifier
- Does not pollute the outer scope outside of the function

## Anonymously Versus Named

---

- Function expressions have anonymous callbacks:

```javascript
setTimeout(() => console.log("Wait a sec"), 1000);
```

- The key difference between an expression vs a declaration is that a declaration cannot omit the name

There are drawbacks to this idiomatic style of code:

- No useful name makes it more challenging to debug
- In case of recursion, _**deprecated**_ `arguments.callee` is required. Another case of self reference is when an event handler wants to unbind itself after firing
- Hard to self document if there is no name

The obvious fix for all of these drawbacks is apply a named function expression

```javascript
setTimeout((timeoutHandler) => console.log("Wait a sec"), 1000);
```
