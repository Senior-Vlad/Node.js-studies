// 📘 РОЗДІЛ 6: Об'єкти глибше + JSON + деструктуризація
// 🎯 Ціль:
// Створювати об’єкти з вкладеними структурами

// Доступатись до вкладених значень

// Використовувати деструктуризацію

// Перетворювати об’єкти ⇄ JSON

// Вправно обходити масиви об'єктів

const user = {
  name: "Vlad",
  age: 19,
  subjects: ["Math", "Programming", "English"],
  adress: {
    // nested object
    city: "Lviv",
    street: "Shevchenka",
    house: 1,
    flat: 2,
    postal: "79000",
  },
  getSummary: function () {
    return `User ${this.name} is ${this.age} years old!, lives in ${this.adress.city}, studying ${this.subjects}`;
  },
};
console.log(user.adress.city);

const blogPost = {
  title: "Learnng JS", // // string
  tags: ["js", "node.js", "backend"], // // array of strings
  comments: [
    // nested array of objects
    { user: "Vlad", text: "Great post!", date: "2023-10-01" },
    { user: "Oleg", text: "Very helpful!", date: "2025-04-18" }, // // object
  ],
};
console.log(blogPost.comments[0].user);
console.log(blogPost.comments[1].text);
console.log(blogPost.comments[0].date + "\n");

const person = { P_name: "Vlad", age: 19, city: "Lviv" };
const { P_name, P_age, city } = person; // destructuring
console.log(P_name, P_age, city); // Vlad 19 Lviv
const { city: town } = person; // destructuring with renaming
console.log(town); // Lviv
console.log("\n");

//JSON (JavaScript Object Notation) - text format for data exchange
//JSON.stringify() - converts object to JSON string
//JSON.parse() - converts JSON string to object

const data = {
  name: "Vlad",
  age: 19,
  city: "Lviv",
  isStudent: true,
};
const json = JSON.stringify(data); // convert object to JSON string
console.log(data, "\n", json);

console.log(user.getSummary());

// Destructure
const { name, age, adress, subjects } = user; // destructuring
console.log(
  `Name: ${name}, user_age: ${age}, ZIP: ${adress.postal}, Subjects: ${subjects}`
); // Name: Vlad, ZIP: 79000, Subjects: Math,Programming,English

// JSON
const jsonData = JSON.stringify(user); // convert object to JSON string
console.log("AS JSON: ", jsonData); // AS JSON:  {"name":"Vlad","age":19,"subjects":["Math","Programming","English"],"adress":{"city":"Lviv","street":"Shevchenka","house":1,"flat":2,"postal":"79000"},"getSummary":{}}
const parsedUser = JSON.parse(jsonData); // convert JSON string to object
console.log("Parsed: ", parsedUser.name); // Parsed:  Vlad

console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
const order = {
  id: 101,
  customer: {
    name: "Alice",
    phone: "123-456-7890",
  },
  items: [
    { product: "Laptop", price: 1200 },
    { product: "Mouse", price: 20 },
    { product: "Keyboard", price: 50 },
  ],
};

console.log(order.customer.name);
// console.log(
//   order.items.reduce(() => {
//     let count = 0;
//     for (let t of order.items) {
//       count++;
//     }
//     return count; // sum of prices
//   })
// );
console.log(order.items.length);
console.log(order.items.reduce((sum,item) => sum + item.price,0)); // sum of prices


const { id, customer, items } = order; // destructuring
const order_JSON = JSON.stringify(order); // convert object to JSON string
const order_parsed_back = JSON.parse(order_JSON); // convert JSON string to object
console.log(order_parsed_back.items[0].product);
