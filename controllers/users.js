const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      })
    )
    .catch((err) => {
      if (err.message === "Invalid email or password") {
        return next(new UnauthorizedError("Invalid email or password"));
      }

      return next(err);
    });
};
const getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }

      return next(err);
    });

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("Email already exists");
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }

      return next(err);
    });
};

const updateProfile = (req, res, next) =>
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }

      return next(err);
    });

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
