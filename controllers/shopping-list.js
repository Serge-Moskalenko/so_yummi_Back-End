const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const getShoppingList = async (req, res) => {
  const { _id } = req.user;
  const data = await User.findById(_id).populate("shoppingList");
  res.status(200).json(data);
};

const removeShoppingList = async (req, res) => {
  const { _id } = req.user;
  const { ingredientId } = req.body;
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
  res.status(200).json({ message: "Ingredient deleted" });
};

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
  removeShoppingList: ctrlWrapper(removeShoppingList),
};
