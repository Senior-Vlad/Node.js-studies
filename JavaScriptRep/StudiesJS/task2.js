let product = {
  name: "Laptop",
  price: 1200,
  inStock: true,
  brand: "ASUS",
  rating: 4.7,
};

// 1. If product is in stock AND price < 1000 => "Discounted!"
// 2. Else if price >= 1000 => "Premium product!"
// 3. Else => "Out of stock"

if (product.inStock && product.price < 1000) {
  console.log("Discounted!");
} else if (product.price >= 1000) {
  console.log("Premium product!");
} else {
  console.log("Out of stock");
}

// 4. Switch by brand
switch (product.brand) {
  case "Apple":
    console.log("Premium Apple product");
    break;
  case "ASUS":
    console.log("ASUS reliable machine");
    break;
  default:
    console.log("Generic brand");
}

// 5. Use ternary to check rating
let ratingCheck = product.rating >= 4.5 ? "Highly rated" : "Average";
console.log(ratingCheck);

let user = {
  Uname: "Vlad",
  age: 18,
  isLoggedIn: true,
  subscriptionType: "premium",
};
console.log("\n\n");
if (user.isLoggedIn) {
    console.log("User name: " + user.Uname);
  if (user.age >= 18) {
    console.log("User is old enough!");
    switch (user.subscriptionType) {
      case "free":
        console.log("Free");
        break;
      case "premium":
        console.log("Premium");
        break;
      case "admin":
        console.log("Admin");
        break;
      default:
        console.log("Invalid subscription type...");
        
    }
  } else {
    console.log("Too young");
  }
} else {
  console.log("Access denied!");
}

let logged = user.isLoggedIn ? "Welcome back, "+user.Uname+"!" : "Please log in.";
console.log(logged);
console.log(user.isLoggedIn ? `Welcome back, ${user.Uname}!`: "Please log in.");
