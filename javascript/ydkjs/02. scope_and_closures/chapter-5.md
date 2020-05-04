# Chapter 5 - Scope Closure

---

Closure is when a function can remember and access its lexical scope even when invoked outside of its lexical scope.

Consider the following code example:

```javascript
const makeFunc = () => {
  const name = "Closures";
  const displayName = () => alert(name);

  return displayName;
};

const myFunc = makeFunc();

myFunc();
```

- The `displayName` inner function is returned from the outer function before execution.
- `myFunc()` is a reference to the instance of the function displayName. The instance of `displayName` maintains a reference to its lexical environment, within which the variable `name` exists.
- For this reason, when `myFunc` is invoked, the variable `name` remains available for use.

A more practical example:

```javascript
const start = (x) => (y) => x + y;

const startZero = start(0);
const startNine = start(9);

console.log(startZero(2)); // 2
console.log(startZero(4)); // 4

console.log(startNine(8)); // 17
console.log(startNine(16)); //25
```

- Define a function `start(x)`, takes a single argument, `x`, and returns a new function
- The returned function takes a single argument, `y` and returns the sum of `x` and `y` assigned to `x`
- `start` is a function factory.
- The function factory creates two new functions; one that starts at 0, and one that adds 9.
- `startZero` and `startNine` are both closures. They share the same function body definition, but store different lexical environments. In `startZero's` lexical environment, x is 0, while in the lexical environment for startNine, x is 9.
- With each subsequent `console.log(..)`, the value increases but `startZero` and `startNine` remember the arguments that were passed in

```javascript
const counter = (() => {
  let c = 0;
  return () => ++c;
})();

counter(); // 1
counter(); // 2
```

- A more simple example, by using a variable scoped to the function; `c`, we prevent any access outside of the function to the variable, but continue to keep it accessible to the function

## Loops and Closure

---

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```

- The above would print 6 five times, this is because the output reflects the final value after the loop terminates
- Each iteration of the loop needs its own copy of `i`
- All five functions are closed over in the same shared global scope, which has only one `i` inside it

To fix this we should provide the `setTimeout` its own scope, inside an IIFE would help

```javascript
for (var i = 1; i <= 5; i++) {
  ((j) => {
    setTimeout(() => console.log(j), j * 1000);
  })(i);
}
```

- By putting setTimeout inside an IIFE, each iteration provides a new scope; thus giving the timeout callback the opportunity to close over the scope for each iteration

## Block Scoping

---

`let` hijacks a block and declares a variable in the block, with minor tweaks the following code works

```javascript
for (var i = 1; i <= 5; i++) {
  let j = i;
  setTimeout(() => console.log(j), j * 1000);
}
```

`let` also has a specially defined behaviour at the head of for loops, that behaviour states that the variable will be declared for each iteration as opposed to once.

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```
