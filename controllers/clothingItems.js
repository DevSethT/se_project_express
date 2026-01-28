const clothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) => res.status(500).send(err));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => res.status(500).send(err));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
