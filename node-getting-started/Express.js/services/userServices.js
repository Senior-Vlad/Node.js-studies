//Database logic for users
// Business logic and DB interactions.
const { GetDB, getNextSequence } = require("../config/database.js");

async function getAllUsers() {
  const db = GetDB();
  return db.collection("users").find().toArray();
}

async function getUserById(id) {
  const db = GetDB();
  return db.collection("users").findOne({ id: id });
}

async function createUser(userData) {
  const db = GetDB();

  const newId = await getNextSequence("users");

  const newUser = {
    id: newId,
    name: userData.name,
    email: userData.email,
    age: userData.age,
    createdAt: new Date(),
  };
  await db.collection("users").insertOne(newUser);
  return newUser;
}

async function updateUser(id, newData) {
  const db = GetDB();

  delete newData.id;

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { id: id },
      { $set: newData },
      { returnDocument: "after" }
    );
  if (!result || !result.value) {
    const updatedUser = await db.collection("users").findOne({ id: id });
    if (updatedUser) {
      return updatedUser;
    }
    return null;
  }
  return result.value;
}

async function deleteUser(id) {
  const db = GetDB();

  const result = await db.collection("users").deleteOne({ id: id });
  if (result.deletedCount === 0) {
    throw new Error(`User with id ${id} not found`);
  }
  return { message: `User with id ${id} deleted successfully` };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
