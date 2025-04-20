function createUser(name,age,subscriptionType){
    const newUserId = users.length + 1;
    return users.push({ id: newUserId, name, age, subscriptionType, isLoggedIn:false });
}

function login(userId){
    users = users.map(user => 
        user.id === userId ? { ...user, isLoggedIn: true } : user
    );
}
let users =[
    {id: 1, name:"Maria", age: 29,subscriptionType: "Premium" ,isLoggedIn: false},
    {id: 2, name:"Anna", age: 43,subscriptionType: "Standart+" ,isLoggedIn: false},
    {id: 3, name:"Olga", age: 62,subscriptionType: "Standart" ,isLoggedIn: false},
    {id: 4, name:"Andrew", age: 52,subscriptionType: "Standart" ,isLoggedIn: false},
    {id: 5, name:"Markos", age: 17,subscriptionType: "Kid" ,isLoggedIn: false},
    {id: 6, name:"Wanesa", age: 14,subscriptionType: "Kid" ,isLoggedIn: false},
    {id: 7, name:"Vlad", age: 19,subscriptionType: "Ultimate" ,isLoggedIn: false},
    {id: 8, name:"Kristian", age: 25,subscriptionType: "Ultimate" ,isLoggedIn: false},
    {id: 9, name:"Chloe", age: 22,subscriptionType: "Premium+" ,isLoggedIn: false},
    {id: 10, name:"Peter", age: 38,subscriptionType: "Premium+" ,isLoggedIn: false}
];


console.log(users);
createUser("Marko",20,"Premium");
console.log(users);
login(11);
console.log(users);
