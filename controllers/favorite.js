const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");
const { Recipes } = require("../models/recipes");

const add = async (req, res) => {
  const { _id } = req.user;
  // const { recipesId } = req.params;
  const { recipesId } = req.body;
  const data = await User.findByIdAndUpdate(
    _id,
    {
      $push: { favorite: recipesId },
    },
    { new: true }
  );
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

const remove = async (req, res) => {
  const { _id } = req.user;
  // const { recipesId } = req.params;
  const { recipesId } = req.body;
  const data = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { favorite: recipesId },
    },
    { new: true }
  );
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = {
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
};
