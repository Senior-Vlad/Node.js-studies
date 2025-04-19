//scope - area of the program where a variable can be accessed
//scope chain - the chain of scopes that are checked when looking for a variable

//closure - a function that has access to its own scope, the scope of the outer function, and the global scope
//closures are created when a function is defined inside another function

//hoisting - the process of moving variable and function declarations to the top of their scope
//hoisting allows you to use variables and functions before they are declared
//hoisting only works for variable and function declarations, not for variable assignments
//hoisting only works for var, not for let and const

//SCOPES:
let GlobalVar = "Global variable";

function outerFunction() {
  let outerVar = "Outer variable";
  console.log(GlobalVar); // Global variable
  console.log(outerVar); // Outer variable

  function innerFunction() {
    let innerVar = "Inner variable";
    console.log(GlobalVar); // Global variable
    console.log(outerVar); // Outer variable
    console.log(innerVar); // Inner variable
  }

  innerFunction();
}
console.log(GlobalVar);
outerFunction();
//console.log(outerVar); // ReferenceError: outerVar is not defined
//console.log(innerVar); // ReferenceError: innerVar is not defined

//HOISTING:
// JS "pick ups" the variable declarations at the beggining of the block or function
// but not the assignments
// var - hoisted to the top of the function or global scope, but not initialized
// let and const - hoisted to the top of the block scope, but not initialized

console.log(a);
var a = 5; // undefined
console.log(a); // 5

console.log("\n\n\n");
//console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;
console.log(b); // 10

//console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 15;
console.log(c); // 15

console.log("\n\n\n");

//CLOSURES:
//This is a function that "remembers" variables from outer scope,
// even after that, how the outer function has finished executing

function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log("Count is: ", count);
  };
}

//function inner() has access to the variable count, however, outer() has finished executing.
// This is possible because inner() is a closure, it "remembers" the variables from outer() scope
// and keeps them alive even after outer() has finished executing.

const counter = outer();
counter(); // Count is: 1
counter(); // Count is: 2
counter(); // Count is: 3

// function createUser(username) {
//     return function greet() {
//       console.log(`Welcome back, ${username}!`);
//     };
//   }

//   let greetVlad = createUser("Vlad");
//   greetVlad(); // Welcome back, Vlad!

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("Var:", i);
  }, 1000);
}
//0,1,2
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("Var:", i);
  }, 1000);
}
//3,3,3

const person1 = {
  name: "Vlad",
};

person1.name = "Max";
console.log(person1.name);

//   person1 = {
//     name: "Alex"
//   };
//   console.log(person1.name); // TypeError: Assignment to constant variable.

const person2 = {
  name: "Vlad",
  greet: function () {
    setTimeout(() => {
      console.log("Hello,", this.name);
    }, 1000);
  },
};
person2.greet();
// Hello, Vlad

const person3 = {
  name: "Vlad",
  greet: function () {
    setTimeout(function () {
      console.log("Hello,", this.name);
    }, 1000);
  },
};
person3.greet();
// Hello, undefined
const person4 = {
  name: "Vlad",
  greet: function () {
    const self = this; // save the context of this
    setTimeout(function () {
      console.log("Hello,", self.name);
    }, 1000);
  },
};
person4.greet();
