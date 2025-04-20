async function fetchData(url) {
  try {
    const response = await fetch(url);
    console.log("Response is ", response.statusText);
    const data = await response.json();
    console.log(data[95].userId, data[95].id);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    console.log("Fetch attempt finished."); //always executes
  }
}

fetchData("https://jsonplaceholder.typicode.com/posts");

function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms > 5000) {
      setTimeout(() => {
        reject("Too long delay!");
      }, 1000);
    } else {
      setTimeout(() => {
        resolve("Waited " + ms + "ms");
      }, ms);
    }
  });
}

delay(5000)
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    console.log("Step 2");
    return delay(1000).then((result) => console.log(result));
  })
  .catch((error) => console.log(error))
  .finally(() => console.log("Finished!"));

async function runDelays() {
  try {
    const msg1 = await delay(1000);
    console.log(msg1);
    const msg2 = await delay(2000);
    console.log(msg2);
    //console.log("All done!"); will be executed
    const msg3 = await delay(5500);
    console.log(msg3);
    console.log("All done!"); // This will not execute if previously received rejection
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("Finished!");
  }
}
//runDelays();


function ageChecker(age) {
  return new Promise((resolve, reject) => {
    /*
    if(age>=18){
            resolve("Access granted!");
        }else{
            reject("Too young!");
        }
    */
    try {
      if (age >= 18) {
        console.log("Access granted!");
      }
    } catch (error) {
      reject("Too young!");
    }
  });
}

async function ageVerification(age) {
  // async function always returns Promise
  try {
    const result = await ageChecker(age); // await stops execution until the promise is resolved or rejected
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Age verification completed.");
  }
}

console.log(ageChecker(16), "\n\n", ageVerification(16)); //** */
//ageVerification(16);
// Promise {''} = Object of Promise, that is already finished.
// Promise { <pending> } = Object of Promise, that is still pending
// Promise { <fulfilled> } = Object of Promise, that is already resolved
// Promise { <rejected> } = Object of Promise, that is already rejected
