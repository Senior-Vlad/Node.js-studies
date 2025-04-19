function doSomething(callback) {
  console.log("Doing something...");
  callback();
}

function afterWork() {
  console.log("Done!");
}

doSomething(afterWork); // Передаємо функцію як аргумент

setTimeout(() => {
  console.log("Step 1");
  setTimeout(() => {
    console.log("Step 2");
    setTimeout(() => {
      console.log("Step 3");
    }, 1000);
  }, 1000);
}, 1000);

console.log("Start");

setTimeout(() => {
  console.log("Delayed 4s");
}, 4000);

console.log("End");

function printName(name) {
  console.log("Name: ", name);
  console.log("Welcome, ", name + " !");
}

function callbackFunction(callback, name) {
  callback(name);
}
callbackFunction(printName, "Vlad");

function delayedGreeting(name, callback) {
  console.log("Loading...");
  setTimeout(() => {
    callback(name);
  }, 2000);
}

function greet(name) {
  console.log("Hello, ", name);
}

delayedGreeting("Vlad", greet);

setTimeout(() => {
  console.log("Start");
  setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
      console.log("Step 2");
      setTimeout(() => {
        console.log("Step 3");
        console.log("Done");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
