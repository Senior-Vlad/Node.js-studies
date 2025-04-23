//Entry point of the app

const express = require("express");
const { connectDB } = require("./config/database");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json()); //!

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

app.use((err, req, res, next) => {
  console.error("Error", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running !");
    });
  })
  .catch((error) => {
    console.error("Connection Failed", error);
    process.exit(1);
  });
