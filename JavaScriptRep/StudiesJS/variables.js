//variables
var oldschool = "used in ES5r"; // avoid - has a functional scope
// let and const are block scoped (блокова область видимості)
let modern = "can be reassigned"; // standart for variables
const fixed = "cannot be changed"; //const, але об'єкт можна змінювати

//types of data
let name_p = "Vlad"; //string
let age = 19; //number
let isStudent = true; //boolean
let score = null //null (просто нічого)
let something // undefined (не ініціалізована змінна)
let person = { name: "Vlad", age: 19}; //object (об'єкт)
let id = Symbol("id"); //symbol (унікальний ідентифікатор/ключ)
let big = 1234567890123456789012345678901234567890n; //bigint (для великих чисел)
               //BigInt(1234567890123456789012345678901234567890) 

//Operators
//+,-,*,/,%,** (exponentiation),++(increment),--(decrement)
//+=,-=,*=,/=,%=,**= (assignment operators)?
//==,=== (equality, equality & type),!=,!== (inequality, inequality & type)
//>,<,>=,<= (comparison operators)
//&& (logical AND), || (logical OR), ! (logical NOT)
//? (ternary operator) - if else
//typeof (to check the type of variable)

console.log(typeof name_p); //string
console.log(typeof age); //number
console.log(typeof isStudent); //boolean

console.log(typeof something); //undefined

let result = age>18 && isStudent;
console.log("Allowed to study? - ", result); //true

const greeting = "Hello, my name is " + name_p + ", I am " + age + " years old!"; //string concatenation
console.log(greeting); //Hello Vlad, you are 19 years old!
//greeting = 0; //reassigning const variable is not allowed !
//console.log(greeting); //0 //error: Assignment to constant variable.


let height;
let weight;
let isSmoker;
let country;
let zipCode;

let object_1 = {name_p,age,isStudent,height: 183, weight: 82, isSmoker: false, country: "Poland", zipCode: 12345};
console.log(object_1.age);
console.log(object_1["age"]); //or
console.log(height)// undefined
height = 182;
console.log(height) //182
console.log(object_1.height) //183
for(let key in object_1) {
    console.log(key + ": " + object_1[key] +" "+ typeof(object_1[key])); //object_1[key] + " " + typeof object_1[key]);
}
console.log(object_1["isSmoker"]=true); //false
console.log(object_1.age);
if(object_1.isSmoker == true && object_1["age"]>=18  ) {
    console.log("Allowed to buy cigarettes amd smokes!");
}else if(object_1.age >=18 && object_1.isSmoker == false) {
    console.log("Allowed to buy cigarettes but don't smoke!");

}else{
    console.log("Not allowed to buy cigarettes!");
}

//let check = object_1.country == "Poland" && object_1.isSmoker ? "Eligible" : "Not eligible";

let check =
  object_1.country == "Poland" && object_1.isSmoker
    ? "Eligible"
    : "Not eligible";
console.log(check);

let a = 5;
let b = "5";

console.log(a==b); // equality ?
console.log(a===b); // equality and type ?
console.log(a!=b); // inequality ?
console.log(a!==b); // inequality amd type ?


let role = "use"


switch (role){
    case "admin":
        console.log("You are admin!");
        break;
    case "user":
        console.log("You are user!");
        break;
    default:
        console.log("Who are you at all ?!");
        //break; 
}