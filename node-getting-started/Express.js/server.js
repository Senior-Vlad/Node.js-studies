import express from "express";

const app = express(); // webserver
const PORT = 3005; //setting a port (or from .env)
app.get("/", (req, res) => {
  // if HTTP GET-request on / comes to the server, give back the answer (res.send)
  // req - from user, res - from server
  res.send("Server works perfectly !");
});

app.listen(PORT, () => {
  // when the server is ready to deploy - we get that msg in console
  console.log(`Server started on http://localhost:${PORT}`);
});

app.use(express.json()); // *** middleware - w8 json in body request and automatically unpack it. (unparse)

app.post("/orders", (req, res) => {
  // when someone makes POST on ./orders, function executes
  const { good, price, amount } = req.body; // *** has it's value because of app.use
  console.log("Order received:", { good, price, amount });

  res.status(201).json({
    //Created code
    message: "Order accepted",
    order: { good, price, amount },
  });
});
