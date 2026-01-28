const express = require("express");
const userRouter = express.Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/:userId", getUser);

userRouter.post("/", createUser);

module.exports = userRouter;
