const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Ingredient } = require("../models/ingredient");
const { Recipes } = require("../models/recipes");

///////
const ingredientsList = async (req, res) => {
  const ingredientsList = await Ingredient.find({});
  if (ingredientsList.length == 0) {
    throw HttpError(404, "Not found");
  }
  res.json(ingredientsList);
};
///////
///////
const recipesByIngredient = async (req, res) => {
  const { ingredient } = req.params;

  const ingredientByName = await Ingredient.find({
    ttl: { $regex: ingredient, $options: "i" },
  });
  if (ingredientByName.length == 0) {
    throw HttpError(404, "Not found");
  }

  const recipesByIngredient = await Recipes.find({
    "ingredients.id": ingredientByName[0]._id,
  });
  if (recipesByIngredient.length == 0) {
    throw HttpError(404, "Not found");
  }
  res.json(recipesByIngredient);
};

module.exports = {
  ingredientsList: ctrlWrapper(ingredientsList),
  recipesByIngredient: ctrlWrapper(recipesByIngredient),
};
