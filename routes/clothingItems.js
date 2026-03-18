const express = require("express");

const clothingRouter = express.Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItemBody,
  validateItemId,
} = require("../middlewares/validation");

clothingRouter.post("/", validateClothingItemBody, createItem);

clothingRouter.delete("/:itemId", validateItemId, deleteItem);

clothingRouter.put("/:itemId/likes", validateItemId, likeItem);

clothingRouter.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = clothingRouter;
