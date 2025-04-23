//Controller functions for orders
// Handle request validation or formatting and call Services
const orderService = require("../services/orderService.js");

exports.getAllOrders = async (req, res, next) => {
  try {
    const users = await orderService.findAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const order = await orderService.findOrderById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const newData = req.body;
    const updatedOrder = await orderService.updateOrder(id, newData);
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: "Order not found or no changes made." });
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await orderService.deleteOrder(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order was not found" });
    }
    res.json({ message: "Order was deleted !" });
  } catch (error) {
    next(error);
  }
};
