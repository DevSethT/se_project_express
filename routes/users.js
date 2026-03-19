const express = require("express");
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateProfileUpdate } = require("../middlewares/validation");

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", validateProfileUpdate, updateProfile);

module.exports = userRouter;
