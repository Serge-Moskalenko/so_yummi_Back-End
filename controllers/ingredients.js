const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Ingredient } = require("../models/ingredient");

///////
const ingredientsList = async (req, res) => {
  const ingredientsList = await Ingredient.find({});
  res.json(ingredientsList);
};
///////
///////
const recipesByIngredient = async (req, res) => {};

module.exports = {
  ingredientsList: ctrlWrapper(ingredientsList),
  recipesByIngredient: ctrlWrapper(recipesByIngredient),
};
