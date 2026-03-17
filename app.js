const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");

const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorHandler);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});
app.listen(PORT);
