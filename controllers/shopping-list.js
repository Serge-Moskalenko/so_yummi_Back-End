const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const getShoppingList = async (req, res) => {
  const { _id } = req.user;
  const data = await User.findById(_id).populate("shoppingList");
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data.shoppingList);
};

const removeShoppingList = async (req, res) => {
  const { _id } = req.user;
  if (!req.user) {
    throw HttpError(401);
  }
  const { ingredientId } = req.params;
  const data = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { shoppingList: ingredientId },
    },
    { new: true }
  );
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Ingredient deleted from cart" });
};

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
  removeShoppingList: ctrlWrapper(removeShoppingList),
};
