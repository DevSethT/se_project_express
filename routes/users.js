const express = require("express");
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUserBody } = require("../middlewares/validation");

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", validateUserBody, updateProfile);

module.exports = userRouter;
