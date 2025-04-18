console.log(greet("Vlad"));
function greet(name){
    return `Hello,${name}!`;
}

const multiply = function(a,b){
    return a*b;
}
console.log(multiply(5,10));

const divide_b = (a,b) => a/b;
const square = (a) => {
    return Math.sqrt(a);
}
console.log(divide_b(10,5), square(25));

const calAge = (birthyear,getMonth,getDay) => {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1; //getMonth() returns month from 0 to 11
    let MyYear = currentYear - birthyear ;
    let MyMonth = currentMonth - getMonth;
    if(getMonth>currentMonth){
        MyYear = MyYear - 1;
    }
    currentMonth = 12 - getMonth + currentMonth;
    if(getDay>new Date().getDate()){
        currentMonth = currentMonth - 1;
    }
    let currentDay = 30 - getDay + new Date().getDate();
    return `Years: ${MyYear}, Month: ${currentMonth}, Days: ${currentDay}`;
}
console.log(calAge(2005,7,24));

console.log("\n\n");

function fullName(name,surname){
    return `${name} ${surname}`;
}

const greets = function(user){
    return `Hello, ${user}!`;
}
const ageIn5Years = function(age){
    return age + 5;
}

console.log(fullName("Vlad","Kovalchuk"));
console.log(greets("Vlad"));
console.log(ageIn5Years(18));
console.log("\n\n");

function isAdult(age){
    if(age>=18){
        return true;
    }else if(age>=0&&age<18){
        return false;
    }else{
        return "Invalid age!";
    }
}

const taxes = function(income){
    if(income>1000){
        return income*0.8;
    }else if(income<=1000 && income>0){
        return income*0.9;
    }else{
        return "Invalid input!";
    }
}

function describeUser(name,age){
    return `User ${name} is ${age} years old.`;
}

console.log("Are you an adult ? - ",isAdult(18),"\nYour income that you receive: ",taxes(2000),"\nFinaly, you are: ",describeUser("Vlad",19));