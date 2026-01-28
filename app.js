const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const ItemRouter = require("./routes/clothingItems");
const clothingRouter = require("./routes/clothingItems");

// has to stay above routes
app.use(express.json());

app.use("/users", userRouter);
app.use("/items", clothingRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
