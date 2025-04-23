//DB connection and utilities
const { MongoClient } = require("mongodb");
require("dotenv").config();

let db; // holds the connected DB instance

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MongoDB URI hasn't been set...");
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("myAppDB");
  console.log("Connected");

  await db.collection("users").createIndex({ id: 1 }, { unique: true });
  await db.collection("orders").createIndex({ id: 1 }, { unique: true });

  return db;
}

function GetDB() {
  if (!db) throw new Error("DB's not been connected. Call connectDB first...");
  return db;
}

async function getNextSequence(name) {
  const database = GetDB();

  const existingCounter = await database
    .collection("counters")
    .findOne({ _id: name });
  if (!existingCounter) {
    console.log(`Counter for ${name} does not exist. Creating it.`);
    await database.collection("counters").insertOne({ _id: name, seq: 1 });
    return 1;
  }

  const result = await database
    .collection("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { returnDocument: "after" }
    );

  console.log("FindOneAndUpdate Result:", result);

  if (!result.value) {
    const updatedCounter = await database
      .collection("counters")
      .findOne({ _id: name });
    if (updatedCounter) {
      return updatedCounter.seq;
    }
    throw new Error(`Failed to update sequence for ${name}`);
  }

  return result.value.seq;
}

module.exports = { connectDB, GetDB, getNextSequence };
