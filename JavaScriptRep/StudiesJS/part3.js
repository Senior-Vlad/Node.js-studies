for (let i = 0; i < 5; ++i) {
    console.log(i);
}
console.log("\n\n");
let count = 0;
while (count++ < 6) {
    console.log(count);
}  
console.log("\n\n");
let j = 0;
do{
    console.log(j);
}while(++j<2);

console.log("\n\n");

let fruits = ["apple", "banana", "orange", "kiwi"];
for( let fruit of fruits){//for ... of
    console.log(fruit);
}

console.log("\n\n");

let person = {
    name: "John",
    age: 30,
    city: "New York"
}
for(let key in person){//for ... in
    console.log(key + ": " + person[key]);
}

//forEach, map, filter, reduce
console.log("\n\n");
let numbers = [1, 2, 3, 4, 5];
numbers.forEach(n=> console.log(n)); //forEach

fruits.forEach(function(fruit, index) {
    console.log(index+1 + ": " + fruit);
});

console.log("\n\n");

let double = numbers.map(n => n*2); //map
console.log("Doubled numbers: " +double);
// map is used to create a new array by applying a function to each element of the original array.

let even = numbers.filter(n => n%2==0); //filter
console.log("Even numbers: " +even);
// filter is used to create a new array with elements that pass a certain condition or test.
let sum = numbers.reduce((acc, curr) => acc + curr, 0); // acc is the accumulator, curr is the current value
//??
console.log("Sum of numbers: " +sum);



console.log("\n\n\n\n");

let clients = [
    {name: "Dennis", age: 25, city: "Ottawa", networth: 1000000},
    {name: "John", age: 30, city: "New York", networth: 2000000},
    {name: "Jane", age: 28, city: "Los Angeles", networth: 1500000},
    {name: "Bob", age: 35, city: "Chicago", networth: 3000000}, 
    {name: "Alice", age: 22, city: "Miami", networth: 500000}
]

// for(let i=0;i<clients.length;i++){
//     console.log(clients[i].name + " " + clients[i].age + " " + clients[i].city + " " + clients[i].networth);
// }

// console.log("\n\n");

clients.forEach(client =>{
    console.log(client.name + " " + client.age + " " + client.city + " " + client.networth);
})


console.log(clients.reduce((acc,curr)=>acc+curr.age/clients.length,0)); //average age of clients

console.log("\n\n");
let names = clients.map(client => client.name);
console.log(names);

console.log("\n\n");
console.log(clients.filter(client => client.age>20 && client.age<30));



/*
let products = [
    {name: "Phone", price:800, inStock: true, brand: "Apple", rating: 4.5},
    {name : "Laptor",price:1200,inStock:true,brand:"ASUS",rating:4.4},
    {name : "Tablet", price: 600, inStock: false, brand: "Samsung", rating: 4.2},
    {name : "Smart Watch", price: 200, inStock: true, brand: "Apple", rating: 4.8},
]

products.forEach(product => {
    console.log(`${product.name}: ${product.price} USD\nBrand: ${product.brand}, ${product.rating} stars\n`);
});

let names = products.map(product => product.name);
console.log("Product names: " + names.join(", "));
console.log("\n");
console.log("Products with rating >= 4.5: ",products.filter(product => product.rating >=4.5));
console.log("\n");
console.log("Total price of all the products is: ", products.reduce((acc,cur) => acc+cur.price,0));

*/