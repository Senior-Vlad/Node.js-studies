//Routes for order APIs. Define the URL endpoints => delegate to Controllers.
// import express from "express";
const express = require("express");
const router = express.Router();
const orderCollection = require("../controllers/orderController.js");

router.get("/", orderCollection.getAllOrders);

router.get("/:id", orderCollection.getOrderById);

router.post("/", orderCollection.createOrder);

router.put("/:id", orderCollection.updateOrder);

router.delete("/:id", orderCollection.deleteOrder);

module.exports = router;
