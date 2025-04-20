const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Success123");
  } else {
    reject("Error");
  }
});

promise
  .then((result) => console.log("Success:", result))
  .catch((error) => console.log("Error:", error))
  .finally(() => console.log("Done"));
function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms > 5000) {
      reject("Too long delay!");
    } else {
      setTimeout(() => {
        resolve("Finished delay: " + ms + "ms");
      }, ms);
    }
  });
}

delay(1000)
  .then(() => console.log("Start"))
  .then(() => console.log("Step 1"))
  .then(() => delay(1000))
  .then(() => console.log("Step 2"))
  .then(() => delay(6000)) // => помилка
  .then(() => console.log("Step 3"))
  .then(() => console.log("Done"))
  .catch((error) => console.log("Error:", error))
  .finally(() => console.log("Finally"));

function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("Access granted");
    } else {
      reject("Access denied");
    }
  });
}
checkAge(19)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

function orderPizza(flavor) {
  return new Promise((resolve, reject) => {
    if (flavor === "pepperoni") {
      setTimeout(() => {
        resolve("Pepperoni pizza is ready!");
      }, 2000);
    } else {
      reject("Sorry, we only have pepperoni.");
    }
  });
}

orderPizza("pepperoni")
  .then((result) => {
    console.log("SUCCESS:", result);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  })
  .finally(() => {
    console.log("Process finished.");
  });
