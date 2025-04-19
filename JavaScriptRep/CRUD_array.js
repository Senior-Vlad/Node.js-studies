let products = [
    { id: 1, name: "Laptop", price: 1200, inStock: true, brand: "ASUS", rating: 4.7 },
    { id: 2, name: "Smartphone", price: 800, inStock: false, brand: "Apple", rating: 4.5 },
    { id: 3, name: "Tablet", price: 600, inStock: true, brand: "Samsung", rating: 4.2 },
    { id: 4, name: "Mouse", price: 300, inStock: true, brand: "Garmin", rating: 4.8 },
    { id: 5, name: "Phone", price: 501, inStock: true, brand: "Nokia", rating: 4.1 },
]


console.log(products);
console.log("\n\n\n\n");

console.log(products.filter(product => product.price >500));

let productSearch = products.find(product => product.name ==="Laptop");
console.log(productSearch ? `Product has been found: \nID: ${productSearch.id}.Searched: ${productSearch.name}` : "Product not found!");
//)

// ... - spread operator - creates a shallow copy of an object or array
// unwrap all the properties of the object A into new object B
// {...product} - creates a new object with all the properties of product
let UpdatedProducts = products.map(product =>{//!
    return product.name === "Mouse" ?{...product, price: 50}:product;
    // if(product.name ==="Mouse"){
    //     product.price = 50;
    // }
    //return product;
});

console.log(UpdatedProducts);

console.log("\n\n");

let NewProductsTest = products.filter(product => product.name !=="Phone");
console.log(NewProductsTest);
console.log("\n\n");

let SortedProducts = [...UpdatedProducts].sort((a,b) => a.price - b.price);
console.log(SortedProducts);//!
