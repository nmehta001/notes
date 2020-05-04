## Chapter 4 - Hoisting

---

This is JavaScripts default behaviour of moving declarations to the top of each respective scope.

- Variables and constants declared with `let` and `const` are not hoisted

```javascript
a = 2;
foo();

var foo = () => {
  b = 10;

  console.log(b);

  var b;
};

var a;

console.log(a);
```

Whilst this looks wrong, and you would expect `undefined` or `ReferenceError`, the compiler actually reads the code as:

```javascript
var a;
a = 2;

var foo = () => {
  var b;
  b = 10;

  console.log(b);
};

foo();

console.log(a);
```

- Assignments and function expressions are not hoisted
