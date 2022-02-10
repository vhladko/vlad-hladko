# Closure
## Definition 
> Closure is a function instance and its lexical scope bundled together until there is a reference to that function.

Now let's deal with this definition piece by piece.

First things first - closure it's about functions. If you don't deal with function - there is no closure.

### Function instance and its lexical scope bundled together
You may wonder, what does it mean? To get that, you need to know that function has a dual nature, Function, and Object, which means that your function has source code and can have some properties.

Let's take a look. Define function and try to access it `name` property
```js
function test() {
  console.log('hello, I\'m a test function');
}

console.log(test.name) // Output 'test'
```
You will see in your console `test`.
With that knowledge, we can explain our bundle mechanism. When you create a function, the JS engine automatically adds the function's lexical scope as hidden property.
Different engines may do it differently, but let's take Chrome as an example and try to find these hidden properties there:
```js
var globalScopeVariable = 1;

function closureCreator() {
  var closureVariable = 0;
  var nonUsedClosureVariable = 0;

  return function funcWithClosure() {
    console.log(globalScopeVariable, closureVariable);
  }
}

var closure = closureCreator();

console.dir(closure);
```
After you run this code in your console, you will see such output:
```js
funcWithClosure()
  ...
  [[Scopes]]: Scopes[2]
    0: Closure (closureCreator)
      closureVariable: 0
    1: Global
      globalScopeVariable: 1
```
This `[[Scopes]]` property is exactly what we were looking for.
You may also notice that `nonUsedClosureVariable` is not in that object. Still, it is only because the Chrome engine smart enough to remove it from closure, as we don't use it. But you should be careful cause some old engines or mobile browsers can miss that optimization and may cause memory leaks, so it's better to keep track of variables you are closing.

### Until there is a reference to that function
The garbage collector is responsible for keeping only needed things for your program. This means that until there is a reason to keep your function and its closure alive, GC won't remove it.
The reason's for that may be different. You can store your function in a variable, or your function can be passed as a callback and waiting to be executed later. Because of that, you also may want to clear your references after you are done with your functions.
## Use cases
Why it's useful?

### Divide static and dynamic parts of your function
The closure allows you to separate your function's "static" part from "dynamic".

```js
function getData(url) {
  let baseUrl = 'http://data.com';
  let method = 'get';

  return () => fetch(`${baseUrl}`/`${url}`, { method });
}

let getUsers = getData('users');

getUsers().then(...);
```
### Callbacks/Handlers
You may use closure to pass additional data into your callback/handler function. Imagine you have a counter on your page and need to increment it each time the button clicks.

```js
function handleButtonClick(btn, target) {
  let counter = 0;
  btn.addEventListener('click', function increment() {
    target.innerHTML = ++counter;
  });
}

handlerButtonClick(button, div); // Pseudo elements on your page.
```
In this example, we've closed the `increment` function on `counter` and `target` variables. Even though the function is called after its definition, variables are still there.


## Things to read
- [You dont know JavaScript](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)
- [ECMA Specification](https://tc39.es/ecma262/#sec-runtime-semantics-instantiateordinaryfunctionexpression)
- [Javascript Closures (by Richard Cornford)](http://jibbering.com/faq/notes/closures/)