const express = require("express");

const clothingRouter = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

clothingRouter.get("/", getItems);

clothingRouter.post("/", createItem);

clothingRouter.delete("/:itemId", deleteItem);

clothingRouter.put("/:itemId/likes", likeItem);

clothingRouter.delete("/:itemId/likes", dislikeItem);

module.exports = clothingRouter;
