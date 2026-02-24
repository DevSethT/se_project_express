const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
const clothingRouter = require("./routes/clothingItems");
const authorization = require("./middlewares/auth");
const { getItems } = require("./controllers/clothingItems");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());
app.post("/signin", login);
app.post("/signup", createUser);

app.get("/items", getItems);

app.use(authorization);

app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});

app.listen(PORT);
