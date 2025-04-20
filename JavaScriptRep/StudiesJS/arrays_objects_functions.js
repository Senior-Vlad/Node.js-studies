let order = {
  customer: {
    customerName: "John Doe",
    customerProduct: "Smartphone",
    customerEmail: "email@gmail.com",
    customerID: 123456,
    customerAddress: "123 Main St, Anytown, USA",
  },
  items: {
    item1: {
      productName: "Smartphone",
      productPrice: 699.99,
      productQuantity: 1,
    },
    item2: {
      productName: "Laptop",
      productPrice: 1299.99,
      productQuantity: 1,
    },
    item3: {
      productName: "Headphones",
      productPrice: 199.99,
      productQuantity: 2,
    }
  }
};

const users = [ // array of objects
    {id: 0, name: "Jane Smith", active: true},
    {id: 1, name: "Kohn Doe", active: true},
    {id: 2, name: "Jane Smith", active: false},
    {id: 3, name: "Sam Brown", active: true},
]

const activeUsers = users.filter(user => user.active);/*.map(user =>{
    return {id: user.id, name: user.name, active: user.active}
});*/
console.log(activeUsers);
console.log("\n\n");
const findUser = users.find(user => user.name === "Jane Smith");
//let logged = user.isLoggedIn ? "Welcome back, "+user.Uname+"!" : "Please log in.";
console.log(findUser ? `User found - id: ${findUser.id} ${findUser.name}` : "User not found!");
console.log("\n");
const updateUser = users.map(user => {
    return user.name === "Sam Brown" ?{...user, name:"123",active:false} :user // update user with name Sam Brown to inactive (active: false)
});
console.log(updateUser)

const InActiveUsers = updateUser.filter(user => !user.active);
console.log(InActiveUsers); // filter inactive users

const SortedUsers = [...updateUser].sort((a,b) => a.name.localeCompare(b.name)); // sort users by name
console.log(SortedUsers);

console.log("\n\n\n\n\n\n\n\n\n\n\n\n");


/*
let object  = { object_nested1: {...}, object_nested_2:{...}}; 
То тоді, якщо б я хотів отримати масив значень з якогось вкладеного об'єкта, притому, посортованого - 
let array1 = [ [...object.object_nested1].sort((a,b) => a.поле - b.поле), [...object.object_nested2].sort((a,b) => a.поле.localeCompare(b.поле)]); 
*/ 