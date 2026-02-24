const express = require("express");

const clothingRouter = express.Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

clothingRouter.post("/", createItem);

clothingRouter.delete("/:itemId", deleteItem);

clothingRouter.put("/:itemId/likes", likeItem);

clothingRouter.delete("/:itemId/likes", dislikeItem);

module.exports = clothingRouter;
