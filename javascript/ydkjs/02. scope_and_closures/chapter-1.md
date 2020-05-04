# Scope and Closures

## Chapter 1 - What is Scope?

---

- Giving a program state is often related to its ability to store and pull values out of variables.
- Most often in development, we want to answer the following questions:

  - Where should the variables live?
  - How does the program find them when it needs them?

- A set of rules for storing variables in some location and finding those variables at a later time is called scope

### Compiler Theory

---

- JavaScript is not an interpreted language as misconceived. It is compiled but not well in advance like with other languages.
- Traditional compilation processes include three steps:
  - [Tokenizing/ Lexing](#tokenizing-lexing)
  - [Parsing](#parsing)
  - [Code-Generation](#code-generation)
- The Javascript engine, as with most other compilers, involve more steps to optimise the performance of the execution
- The JS engine does not have build step compilation, it compiles just before execution

<a name='tokenizing-lexing'>Tokenizing/ Lexing</a>

---

Break up a string of characters into chunks called tokens.

```javascript
const a = 2;
```

The above example can be broken down into the following tokens:

- `const`
- `a`
- `=`
- `2`

Whitespace can be persisted if it is meaningful (if you choose to include it, does it make any impact)

**NOTE**
The difference between tokenization and lexing is whether a character would be considered a distinct token (tokenization) or part of another token (lexing)

```javascript
const isEqual = 1 === 2;
```

The tokens would be as follows:

- `const`
- `isEqual`
- `=`
- `1`
- `===`
- `2`

Each token is considered distinct until we get to the `===` sign. The first character is distinct whereas the following two characters are lexical and are part of the first character token.

<a name='parsing'>Parsing</a>

---

Taking a stream (array) of tokens and turning it into a tree of nested elements. That structure is referred to as an Abstract Syntax Tree (AST).

The tree for `const a = 2;` could start with a parent node called `VariableDeclaration`, a child node, `Identifier` (the values is `a`), another child called `AssignmentExpression` (the values is `=`), which has a child itself called `NumericalLiteral` ( values as `2`)

```
VariableDeclaration (const)
  ↳ Identifier (a)
  ↳ AssignmentExpression (=)
    ↳ NumericLiteral (2)
```

<a name='code-generation'>Code-Generation</a>

---

The process of taking an AST and turning it into executable code.

### Understanding Scope

---

#### Players

---

- Engine: Responsible for start-to-finish compilation and execution
- Compiler: Handles parsing and code-generation
- Scope:
  - Collects and maintains a lookup list of all the declared identifiers (variables)
  - Enforces strict rules pertaining to accessibility in the context of currently executing code

#### Back and Forth

---

When reading `const a = 2;`, it can be interpreted as one statement. Then Engine would break it down into two distinct statements. One statement is handled by the Compiler at compilation and the other statement is handled at execution by the Engine.

Compiler's actions:

1. Break down the statement and tokenize it
2. Parse the token into a tree

It could be assumed that the Compiler would be doing the following:
`Allocate memory for a variable, label it a, then stick the value 2 into the variable`

This is not the case, it follows something more along the lines of:

1. Encountering `const a`

   - Ask Scope if variable `a` already exists for scope. If yes, ignore declaration and move on. If not, ask Scope to create a variable called `a` for that scope collection

2. Produces code for Engine to later execute to handle the `a = 2` assignment

   - Engine will ask Scope if a variable called `a` is available in the current scope. If yes, it will use that variable, if not then it looks elsewhere.

If Engine finds the variable it assigns the value 2, otherwise it will raise an error.

#### Compiler Speak

---

When the Engine looks up a variable to see if it has been declared, it consults Scope.

There are two terms used for the two different type of lookups that the Engine can perform:

- Left Hand Side (LHS): left of the assignment operation
- Right Hand Side (RHS): right of the assignment operation

The naming of these terms are slight misnomers, it would be better described as such:

- LHS: `a = 2` we want to assign a value to `a`, not necessarily caring what value it current holds (Who's the target of the assignment?)

- RHS: `console.log(a)` we are only accessing the variable to get its value (Who's the source of the assignment?)

In the following example, it has both LHS and RHS references:

```javascript
const foo = (a) => console.log(a);

foo(2);
```

The last line of the example calls `foo(..)`, this is a RHS reference asking to get the value and give it back.

`console.log(..)` is also RHS as it simply wants the value of `a`

The first line of the example has a subtle assignment where `a = 2`, this is LHS, as again we don't care what the value of `a` is, we want to implicitly change it

#### The Conversation

---

```javascript
const foo = (a) => {
  const b = a;
  return a + b;
};

const c = foo(2);
```

| Engine                                        | Scope                                | Look-Up      |
| --------------------------------------------- | ------------------------------------ | ------------ |
| I have a LHS look-up for c, heard of it?      | Nope, sorry                          | -            |
| Would you create this for me please?          | Sure, it's done                      | LHS - c      |
| I have a RHS look-up for foo                  | I have foo, it's a function          | -            |
| Executing foo                                 | -                                    | RHS - foo(2) |
| I have a LHS reference for a, heard of it?    | Yup, it's a parameter of foo         | -            |
| Cool, I will assign 2 to a                    | -                                    | LHS - a = 2  |
| I have a LHS look-up for b, do you have that? | Nada amigo                           | -            |
| Dang, would you create it?                    | You got it!                          | LHS - b      |
| I have a RHS for a, do we have this?          | Yeah, no change since the last check | -            |
| Great, I will assign a to b                   | -                                    | RHS - = a    |
| I have a RHS look-up for a, still there?      | Yup                                  | -            |
| I have a RHS look-up for b, no change?        | Still the same                       | -            |
| Cool I will return a + b                      | -                                    | RHS - a, b   |

### Nested Scope

---

In the previous examples, there was only one scope to consider. There are often scopes within scopes just like there are functions and blocks within each other respectively.

If a variable can't be found in the immediate scope, the Engine consults the next outer scope until it is found or reaches the outermost (global) scope.

```javascript
const foo = (a) => console.log(a + b);

const b = 2;

foo(2);
```

`b` is declared outside of foo, when foo calls on b, it will not be able to resolve the variable inside the function.

The conversation could be as follows:

| Engine                                            | Scope                         |
| ------------------------------------------------- | ----------------------------- |
| I have a RHS for `b`, do you have it?             | Hey, sorry, I don't have this |
| Okay, I'll ask the next outer scope               | -                             |
| Hey outer scope, do you have anything called `b`? | Sure do, here you go          |

The Engine starts at the currently executing scope, continuing outwards through each scope until the variable is found. If it reaches the global scope and is still unable to find the variable, the search stops.
