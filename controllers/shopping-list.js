const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");
const { Cart } = require("../models/cart");

const getShoppingList = async (req, res) => {
  const { pages = 1, limit = 5 } = req.query;
  const skip = (pages - 1) * limit;
  const user = req.user;
  if (!user) {
    throw HttpError(401);
  }
  const result = await Cart.find({ owner: { $eq: user._id } })
    .skip(skip)
    .limit(limit);

  res.status(200).json(result);
};

const removeShoppingList = async (req, res) => {
  const { _id } = req.user;
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
