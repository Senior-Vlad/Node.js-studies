function createUser(name, age, subscriptionType) {
  const newUserId = users.length + 1;
  return users.push({
    id: newUserId,
    name,
    age,
    subscriptionType,
    isLoggedIn: false,
  });
}

function login(userId) {
  users = users.map((user) =>
    user.id === userId ? { ...user, isLoggedIn: true } : user
  );
}

function activeUsers() {
  return users.filter((user) => user.isLoggedIn === true);
}

function getUsersByAge(age_f) {
  return users.filter((user) => user.age == age_f);
}
function getUsersByAges(age_f, age_t) {
  return users.filter((user) => user.age >= age_f && user.age <= age_t);
}

function getUsersBySub(sub) {
  return users.filter((user) => user.subscriptionType === sub);
}

function checkAccess_a(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const user = users.find((user) => user.id === userId); // Find user by id
        if (!user) {
          reject(`Failure, user: id=${userId} does not exist!`);
          return;
        }
        if (user.subscriptionType === "Premium") {
          resolve(`Success, user: id=${userId},has a premium sub !`);
        } else {
          reject(`Failure, user: id${userId},doesn't have a premium sub!`);
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  });
}

async function checkAccess(userId) {
  try {
    console.log(await checkAccess_a(userId));
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Checking finished !");
  }
}

let users = [
  {
    id: 1,
    name: "Maria",
    age: 29,
    subscriptionType: "Premium",
    isLoggedIn: false,
  },
  {
    id: 2,
    name: "Anna",
    age: 43,
    subscriptionType: "Standart+",
    isLoggedIn: false,
  },
  {
    id: 3,
    name: "Olga",
    age: 62,
    subscriptionType: "Standart",
    isLoggedIn: false,
  },
  {
    id: 4,
    name: "Andrew",
    age: 52,
    subscriptionType: "Standart",
    isLoggedIn: false,
  },
  {
    id: 5,
    name: "Markos",
    age: 17,
    subscriptionType: "Kid",
    isLoggedIn: false,
  },
  {
    id: 6,
    name: "Wanesa",
    age: 14,
    subscriptionType: "Kid",
    isLoggedIn: false,
  },
  {
    id: 7,
    name: "Vlad",
    age: 19,
    subscriptionType: "Ultimate",
    isLoggedIn: false,
  },
  {
    id: 8,
    name: "Kristian",
    age: 25,
    subscriptionType: "Ultimate",
    isLoggedIn: false,
  },
  {
    id: 9,
    name: "Chloe",
    age: 22,
    subscriptionType: "Premium+",
    isLoggedIn: false,
  },
  {
    id: 10,
    name: "Peter",
    age: 38,
    subscriptionType: "Premium+",
    isLoggedIn: false,
  },
];

console.log(users);
createUser("Marko", 20, "Premium");
console.log(users);
login(11);
for (let i = 0; i < users.length - 5; i++) {
  login(i);
}
console.log(users, "\n\n123");
console.log(activeUsers());
console.log(
  "\n\n\n",
  getUsersBySub("Premium"),
  "\n\n\n\n\n",
  getUsersByAge(20),
  "\n\n\n\n\n",
  getUsersByAges(20, 40)
);

checkAccess(11);
/*
(async () => {
    await checkAccess(11); // Logs the result after 2 seconds
})();
*/
