### Appendix A - Dynamic Scopes

---

As a direct contrast to lexical scope, scope is determined dynamically at runtime as opposed to statically at author time.

```javascript
function foo() {
  console.log(a);
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;

bar();
```

Typically, the resolution of the variable `a` in `foo()` will be from the global scope. This would result in the logged value being `2`.

However if dynamic, the logged value is `3` as the dynamic scope is based on the call-stack rather than the nesting of scopes.

The series of steps that lexical scoping takes is also different.

| Lexical                                   | Dynamic                                   |
| ----------------------------------------- | ----------------------------------------- |
| Attempts to resolve the reference         | Attempts to resolve the reference         |
| `a` is not declared in the scope of `foo` | `a` is not declared in the scope of `foo` |
| Goes up the scope chain                   | Walks up the call-stack                   |
| `a` is declared globally, `a = 2`         | `bar` calls `foo`and contains `a = 3`     |

- Lexical scoping cares where the function was declared
- Dynamic scoping cared where the function was called from
