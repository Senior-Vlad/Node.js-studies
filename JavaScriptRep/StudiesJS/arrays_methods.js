let colors = ["red", "green", "blue", "yellow", "purple"];
console.log(colors);
colors.push("orange");
console.log(colors,"after push('orange')");
console.log("\n");

colors.pop();
console.log(colors,"after pop()");
console.log("\n");
colors.unshift("pink");
console.log(colors,"after unshift('pink')");
console.log("\n");
colors.shift();
console.log(colors,"after shift()");
console.log("\n");
colors.splice(3,3,"purple2", "cyan");
console.log(colors,"after splice(3,3,'purple2,'cyan')");//splice(start, deleteCount, item1, item2, ...)
//splice is used to add or remove elements from an array at a specific index.
//?
console.log("\n");
let fewColors = colors.slice(0,4);
console.log(fewColors,"<= new array after slice(0,4)");//slice(start, end) //end is not included
console.log("\n",colors.includes("red"),"after includes('red')");
console.log("\n",colors.indexOf("red"),"after indexOf('red')"); //indexOf(item) //returns the first index of the item in the array

let numbers = [5, 99, 21, 0, -20];
console.log("Unsorted numbers: ",numbers);
numbers.sort((a,b)=> a-b);//ascending order
//numbers.sort();//default sorting (lexicographical order)
console.log("Sorted numbers: ",numbers);

console.log(numbers.reverse(),"after reverse()");
console.log("\n");
console.log("\n\n\n");

let clients = [
    {name: "Anna", balance: 1000, age: 25},
    {name: "Bob", balance: 500, age: 30},
    {name: "Charlie", balance: 2000, age: 35},
    {name: "David", balance: 1500, age: 28},
    {name: "Eva", balance: 800, age: 22},
]
clients.push({name:"Frank", balance: 1200,age:22});
console.log(clients);
clients.pop();
clients.shift();
let rich_clients = clients.filter(clients => clients.balance >1200);
console.log(rich_clients);
clients.sort((a,b)=> a.balance-b.balance);
clients.reverse();
console.log(clients);
console.log(clients.find(client => client.name="Anna"));
console.log(clients.includes(clients.find(clients => clients.name="Anna")));
console.log(clients.some(client => client.name==="Anna"))