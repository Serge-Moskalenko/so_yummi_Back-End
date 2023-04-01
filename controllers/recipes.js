const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Recipes } = require("../models/recipes");
//
const categoriesType = [
  "Beef",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Goat",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
];
///////
const recipesCategory = async (req, res) => {
  const categories = categoriesType.sort();
  res.json(categories);
};
///////
///////

const recipesList = async (req, res) => {};
///////
///////
const recipesByCategory = (req, res) => {};
///////
///////
const recipesById = (req, res) => {};
module.exports = {
  recipesCategory: ctrlWrapper(recipesCategory),
  recipesList: ctrlWrapper(recipesList),
  recipesByCategory: ctrlWrapper(recipesByCategory),
  recipesById: ctrlWrapper(recipesById),
};
