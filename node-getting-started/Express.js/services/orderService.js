// Database logic for orders
//  Business logic and DB interactions.export const saveOrder = (good, price, amount) => {
const { GetDB, getNextSequence } = require("../config/database.js");

async function getAllOrders() {
  const db = GetDB();
  return db.collection("orders").find().toArray();
}

async function getOrderById(id) {
  const db = GetDB();
  return db.collection("orders").findOne({ id: id });
}

async function createOrder(newData) {
  const db = GetDB();

  const newId = await getNextSequence("orders");

  const newOrder = {
    id: newId,
    userEmail: newData.userEmail,
    good: newData.good,
    price: newData.price,
    amount: newData.amount,
    time: new Date(),
  };

  await db.collection("orders").insertOne(newOrder);
  return newOrder;
}

async function updateOrder(id, newData) {
  const db = GetDB();

  delete newData.id;

  const result = await db
    .collection("orders")
    .findOneAndUpdate(
      { id: id },
      { $set: newData },
      { returnDocument: "after" }
    );
  if (!result || !result.value) {
    const updatedOrder = await db.collection("orders").findOne({ id: id });
    if (updatedOrder) {
      return updatedOrder;
    }
    return null;
  }
  return result.value;
}

async function deleteOrder(id) {
  const db = GetDB();
  const result = await db.collection("orders").deleteOne({ id: id });
  if (result.deletedCount === 0) {
    throw new Error(`Order with id ${id} not found`);
  }
  return { message: `Order with id ${id} deleted successfully` };
}

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrder,
  createOrder,
  deleteOrder,
};
