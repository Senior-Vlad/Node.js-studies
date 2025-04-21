const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.error("Connection failed. RS: ", error));
