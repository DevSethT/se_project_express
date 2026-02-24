const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
const clothingRouter = require("./routes/clothingItems");
const authorization = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());
app.post("/signin", login);
app.post("/signup", createUser);

app.use("/items", clothingRouter);

if (process.env.NODE_ENV === "test") {
  app.use((req, res, next) => {
    req.user = {
      _id: "5d8b8592978f8bd833ca8133",
    };
    next();
  });
} else {
  // In real usage, protect routes with JWT auth
  app.use(authorization);
}

app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});

app.listen(PORT);
