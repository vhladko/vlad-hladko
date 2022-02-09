# Closure

**Closure in JavaScript is a mechanism that allows functions to keep their Lexical Scope during your program life.**

How does it work?
Everything in JS is a kind of Object, the same thing for functions. They have dual nature, Function, and Object. It means that your function can have some properties on itself.

For example, you can do something like that:

```javascript
function getData() {
  makeApiCall()
}

console.dir(getData)
```

In console you will see an object structure of your function, which also contains some "hidden" and non-accessible properties like `[[Scope]]`, `[[Prototype]]`

In that case you won't find any closure there, but if we change code to:

```js
var nonClosureVariable = 1;

function closureCreator() {
  var closureVariable = 0;
  var nonUsedClosureVariable = 0;

  return function funcWithClosure() {
    console.log(nonClosureVariable, closureVariable);
  }
}

var closure = closureCreator();

console.dir(closure);
```

Now, if you expand `[[Scope]]`, you will find there a `Closure` property, which actually contains your `closureVariable`. 
All magic happens when you `return` function. At this moment, JS adds to your returned function instance this `backpack` with all hidden properties.

```js
funcWithClosure()
  ...
  [[Scopes]]: Scopes[2]
    0: Closure (closureCreator)
      closureVariable: 0
    1: Global
```

JS is smart enough to understand which variables you are using and take only them into closure.
According to MDN:
> A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

So we may notice that the `Closure` property contains only local variables, but not outer ones.

In the end, your function still has access to `nonClosureVariable`. It can process it in different ways, so we also can think of it as part of `Closure`. But in fact, it's just a part of `Global Scope`, which is why your function knows about it.

