const express = require("express");
const { getCurrentUser, updateProfile } = require("../controllers/users");

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", updateProfile);

module.exports = userRouter;
