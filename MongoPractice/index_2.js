import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

//Pipelines (Aggregation)

async function initializeCounter() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const counters = db.collection("counters");

    const existing = await counters.findOne({ _id: "orderId" });
    if (!existing) {
      await counters.insertOne({
        _id: "orderId",
        sequence_value: 0,
      });
      console.log("Counter initialized!");
    } else {
      console.log("Counter already exists.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export { initializeCounter };

async function groupByAge() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection
      .aggregate([
        {
          $group: {
            _id: "$age", //grouping by age
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 }, // decreasingly 1 - increasingly
        },
      ])
      .toArray();
    console.log("Grouped by age: ", result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function findUser() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection
      .aggregate([
        {
          $match: { age: { $gte: 18 } },
        },
        {
          $group: {
            _id: "$age",
            count: { $sum: 1 }, // amount of records in each group
            avrAge: { $avg: "$age" },
          },
        },
      ])
      .toArray();
    console.log("Finded: ", result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function findUsersByAge_NamesAvgAge(age_f) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");
    const result = await userCollection
      .aggregate([
        {
          $match: { age: { $gte: age_f } }, //>age_f
        },
        {
          $group: {
            _id: "$age",
            totalUsers: { $sum: 1 },
            avgAge: { $avg: "$age_f" },
            names: { $push: "$name" },
          },
        },
        { $sort: { totalUsers: -1 } },
      ])
      .toArray();
    console.log("Finded: ", result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function getNextSequenceValue(db, sequence_f) {
  if (typeof sequence_f !== "string") {
    throw new Error("Invalid sequence entered...");
  }
  //const db = client.db("myAppDB");
  const counters = db.collection("counters");

  const result = await counters.findOneAndUpdate(
    { _id: sequence_f },
    { $inc: { sequence_value: 1 } },

    { upsert: true, returnDocument: "after" } //..
  );
  console.log(result);

  return result.sequence_value;
}

async function ordersCreate(good_f, price_f, amount_f, email_f) {
  try {
    if (
      typeof good_f !== "string" ||
      typeof price_f !== "number" ||
      typeof amount_f !== "number"
    ) {
      throw new Error("Invalid input...");
    }

    await client.connect();
    const db = client.db("myAppDB");
    const orderCollection = db.collection("orders");

    const nextId = await getNextSequenceValue(db, "orderId");
    console.log("Got ID:", nextId);

    const data = new Date();
    const getData =
      data.getDate() +
      "." +
      (data.getMonth() + 1) +
      "." +
      data.getFullYear() +
      " " +
      data.getHours() +
      ":" +
      data.getMinutes() +
      ":" +
      data.getSeconds();

    const newOrder = {
      id: nextId,
      time: getData, //new Data(),
      userEmail: email_f,
      good: good_f,
      price: price_f,
      amount: amount_f,
    };

    const result = await orderCollection.insertOne(newOrder);
    console.log("New Order Received !", result.insertedId);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function getUserWithOrders() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection
      .aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "email",
            foreignField: "userEmail",
            as: "orders",
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            age: 1,
            "orders.id": 1,
            "orders.good": 1,
            "orders.price": 1,
            "orders.amount": 1,
            "orders.time": 1,
            _id: 1,
          },
        },
      ])
      .toArray();

    console.log("Users with Orders:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

await getUserWithOrders();

//await ordersCreate("Laptop", 15000, 300, "vladyslav@example.com");

//await findUsersByAge_NamesAvgAge(18);

//lookup - (~SQL JOIN)

//await findUser();
/*
operator | what does it do
$sum | підсумовує значення або просто кількість
$avg | counts average
$min | finds minimum value
$max | finds max value
$push | adds value to the array (end)
$addToSet | adda unique value to array
$first | first value in the group
$last | last value in the group

Оператор | Для чого використовується? | Приклад
$match | Фільтрує документи (аналог find) | { $match: { age: { $gte: 18 } } }
$group | Групує документи та дозволяє робити агрегації (підрахунок, сума, середнє тощо) | { $group: { _id: "$age", total: { $sum: 1 } } }
$sort | Сортування результатів | { $sort: { age: -1 } }
$project | Вивід лише вибраних полів або створення нових | { $project: { name: 1, email: 1 } }
$limit | Обмежує кількість результатів | { $limit: 5 }
$skip | Пропускає N документів | { $skip: 10 }
$unwind | Розпаковує масиви в документи | { $unwind: "$tags" }
$lookup | Робить join між колекціями (аналог JOIN в SQL) | { $lookup: { from: "orders", localField: "userId", foreignField: "user_id", as: "userOrders" } }
$addFields | Додає нові поля на основі обчислень або логіки | { $addFields: { isAdult: { $gte: ["$age", 18] } } }
*/
