const express = require("express");
const clothingRouter = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

clothingRouter.get("/", getItems);

clothingRouter.post("/", createItem);

clothingRouter.delete("/:itemId", deleteItem);

module.exports = clothingRouter;
