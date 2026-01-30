const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "697a9ff67642785ab4351777",
  };
  next();
});

app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});

app.listen(PORT);
