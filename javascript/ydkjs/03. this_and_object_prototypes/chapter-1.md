# Chapter 1 - `this` or That?

## Why?

```javascript
const identify = () => this.name.toUpperCase();
const speak = () => {
  const greeting = `Hello, I'm ${identify.call(this)}`;
  console.log(greeting);
};

const me = {
  name: "Test",
};

const you = {
  name: "Reader",
};

identify.call(me);
identify.call(you);

speak.call(me);
speak.call(you);
```

- Allows both the `identify` and `speak` functions to be reused with multiple **_context_** objects (me and you) rather than using a separate function for each argument

```javascript
const identify = (context) => context.name.toUpperCase();
const speak = (context) => {
  const greeting = `Hello, I'm ${identify(context)}`;
  console.log(greeting);
};

identify(me);
speak(you);
```

- While this is a good alternative to using this, it's not as clean when it comes to API design and not as easy to reuse.
- Explicitly passing around context can become messier depending upon the usage pattern

## Confusions

---

### Itself

- Reasonable grammatical inference would mis-lead one to think that `this` refers to the function itself

  - Recursion for calling itself
  - Unbinding event handlers after first call

- `this` does not let get a reference to itself, mistakenly believed to store state between function calls

```javascript
const foo = (num) => {
  console.log({ num });
  this.count++;
};

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}

// {num: 6}
// {num: 7}
// {num: 8}
// {num: 9}

console.log(foo.count); // 0
```

- The code adds property `count` on to `foo`
- `this` is not pointing to the function object
- Despite property names being the same, the root objects are different

- A fix, that sidesteps the issue, is to declare a variable to keep track of any state changes

  - e.g. `const data = {count: 0};`, `data.count++`

- Another fix would be to not use `this` at all (change `this` to `foo` instead, again sidestepping)

```javascript
const foo = (num) => {
  console.log({ num });
  foo.count++;
};

// ...
```

- To properly make use of `this`, forcing it to point at the `foo` function object would be better:

```javascript
const foo = (num) => {
  console.log({ num });
  this.count++;
};

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo.call(foo, i);
  }
}

// {num: 6}
// {num: 7}
// {num: 8}
// {num: 9}

console.log(foo.count); // 4
```

### Its Scope

It does not refer to the lexical scope of a function. Considering the following code, it can not work but this was a common practice:

```javascript
var foo = () => {
  var a = 2;
  this.bar();
};

var bar = () => console.log(this.a);

foo(); // ReferenceError - a is not defined
```

- Unnatural to call `bar` using `this` as a precursor
- Essentially trying to create a bridge between functions that have no understanding of one another

### What's this?

- `this` is a runtime binding, it is dynamically based on where the function was invoked
  - Execution context is created for the function
    - Where was it called from? (call stack)
    - How was it invoked?
    - Passed parameters
    - etc
  - One of the properties of the context is `this`, it exists for the duration of the function's execution
