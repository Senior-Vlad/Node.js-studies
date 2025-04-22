import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config(); // loads variables from .env into process.env
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to Mongo DB !");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function setupDatabase() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    await userCollection.createIndex({ email: 1 }, { unique: true });
    console.log("Index ensured !");
  } catch (error) {
    console.error("Setup failed...", error);
  } finally {
    await client.close();
  }
}
export { setupDatabase };

//connectDB();

async function createUser(name_f, age_f, email_f) {
  try {
    if (
      typeof name_f != "string" ||
      typeof age_f != "number" ||
      typeof email_f != "string"
    ) {
      throw new Error("Invalid input.\nOperation denied !");
    }
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");
    const newUser = {
      name: name_f,
      age: age_f,
      email: email_f,
    };

    const result = await userCollection.insertOne(newUser);
    console.log("Inserted user ID: ", result.insertedId);
  } catch (error) {
    if (error.code === 11000) {
      console.log("This email already exists !\nTry with another valid email.");
    } else {
      console.error(error);
    }
  } finally {
    await client.close();
  }
}

async function readUsers() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray();
    console.log("Users From DB:", users);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function updateUser(email, updated, ToUpdate) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    if (
      typeof email !== "string" ||
      !["name", "age", "email"].includes(updated)
    ) {
      throw new Error("Invalid input...\nTry again.");
    }

    const result = await userCollection.updateOne(
      { email },
      { $set: { [updated]: ToUpdate } }
    );
    console.log(
      "Matched:",
      result.matchedCount,
      "Modified:",
      result.modifiedCount
    );
    // if (typeof filter_v == "string" && typeof variable == "number") {
    //   const result = await userCollection.updateOne(
    //     { name: filter_v },
    //     { $set: { age: variable } }
    //   );
    //   console.log(
    //     "Matched:",
    //     result.matchedCount,
    //     "Modified:",
    //     result.modifiedCount
    //   );
    // } else if (typeof filter_v == "number" && typeof variable == "string") {
    //   const result = await userCollection.updateOne(
    //     { age: filter_v },
    //     { $set: { name: variable } }
    //   );
    //   console.log(
    //     "Matched:",
    //     result.matchedCount,
    //     "Modified:",
    //     result.modifiedCount
    //   );
    // } else if (typeof filter_v == "number" && typeof variable == "number") {
    //   const result = await userCollection.updateOne(
    //     { age: filter_v },
    //     { $set: { age: variable } }
    //   );
    //   console.log(
    //     "Matched:",
    //     result.matchedCount,
    //     "Modified:",
    //     result.modifiedCount
    //   );
    // } else if (typeof filter_v == "string" && typeof variable == "string") {
    //   const result = await userCollection.updateOne(
    //     { name: filter_v },
    //     { $set: { name: variable } }
    //   );
    //   console.log(
    //     "Matched:",
    //     result.matchedCount,
    //     "Modified:",
    //     result.modifiedCount
    //   );
    // } else {
    //   throw new Error("Invalid input.\nTry again !");
    // }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function updateUsers(filter, obj) {
  try {
    if (typeof filter !== "object" || typeof obj !== "object") {
      throw new Error("Invalid input...\nTry again!");
    }
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection.updateMany(filter, { $set: obj });
    console.log(
      "Matched:",
      result.matchedCount,
      "Modified:",
      result.modifiedCount
    );
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function replaceUser(filter, newVar) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection.replaceOne(filter, newVar);

    console.log(
      "Matched",
      result.matchedCount,
      "Modified",
      result.modifiedCount
    );
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function deleteUserbyEmail(email_f) {
  //deletes one record
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection.deleteOne({ email: email_f });
    console.log("Deleted account: ", result.deletedCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function deleteAllUsersbyAge(age_f) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");
    //await collection.deleteMany({}); - deletes everything in collection!
    const result = await userCollection.deleteMany({ age: { $lt: age_f } });

    console.log("Deleted documents are: ", result.deletedCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function deleteAllUsersbyCertainAge(age_f, age_t) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");
    const result = await userCollection.deleteMany({
      age: { $gte: age_f, $lte: age_t },
    });
    console.log("Deleted documents are: ", result.deletedCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function findUserbyEmail(email_f) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection.findOne({ email: email_f });

    if (result) {
      console.log("User found ! ", result);
    } else {
      console.log("There is no such user with this email...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function findAllUsersByAge(age_f, age_t) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = await userCollection
      .find({ age: { $gte: age_f, $lte: age_t } })
      .toArray();
    //.find ({$or: [{age: {$lte:age_f}},{age:{$gte:age_t}}]})
    if (result.length > 0) {
      console.log("Finded users are: ", result);
    } else {
      console.log("No such users...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function findUsersByAgeOrName(age_f, name_f) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = userCollection
      .find({
        $and: [{ age: { $lte: age_f } }, { name: name_f }],
      })
      .toArray();

    if (result.length > 0) {
      console.log("Finded users: ", result);
    } else {
      console.log("Couldn't find any users...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function findAllUsersBut(age_f, name_f) {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const userCollection = db.collection("users");

    const result = userCollection
      .find({
        age: { $not: { $gte: age_f } }, //age: { $lt: age_f }
        name: { $ne: name_f },
      })
      .toArray();
    if (result.length > 0) {
      console.log("Filtred users: ", result);
    } else {
      console.log("No users were used for filtration...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

//await createUser("Vladyslav", 19, "vladyslav@example.com");

await readUsers();

//await updateUser("email3@example.com", "email", "email323@example.com");
await updateUsers(
  { age: { $lt: 18 } }, // filter: всі користувачі молодші за 18
  { status: "minor" } // оновити поле `status`
);

await replaceUser(
  { email: "emailKid@example.com" },
  { email: "emailNewGen@email.com", name: "Vlad", age: "19" }
);

await readUsers();

/*
Operator | Description
$eq | (==)
$ne | (!=)
$gt | (>)
$gte | (>=)
$lt | (<)
$lte | (<=)
$in | in the array
$nin | isn't in the array
$exists | if exists?
$type | type verification
$or | at least 1 request fulfills (||)
$and &&
$not !=

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
