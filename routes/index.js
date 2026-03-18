const router = require("express").Router();

const userRouter = require("./users");
const clothingRouter = require("./clothingItems");

const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");

const NotFoundError = require("../errors/not-found-err");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);
router.get("/items", getItems);

router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
