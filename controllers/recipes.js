const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Ingredient } = require("../models/ingredient");
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
  const categories = [...categoriesType].sort();
  res.json(categories);
};
///////
///////

const recipesList = async (req, res) => {
  const recipes = await Recipes.find();
  if (!recipes) {
    throw HttpError(404, "Not found");
  }
  res.json(recipes);
};
///////
///////
const recipesByCategory = async (req, res) => {
  const { category = "Beef" } = req.params;
  console.log(category);
  const result = await Recipes.find({ category: { $eq: category } }).limit(8);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
///////
///////
const recipesById = async (req, res) => {
  const { recipesId } = req.params;
  const recipe = await Recipes.find({ _id: { $eq: recipesId } });
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  res.json(recipe);
};
const recipesSearch = async (req, res) => {
  const { pages = 1, limit = 12 } = req.query;

  const { word } = req.params;
  console.log(pages, limit, word);
  const skip = (pages - 1) * limit;
  if (categoriesType.includes(word)) {
    const ingredientByName = await Ingredient.find({
      ttl: { $eq: word },
    });
    if (!ingredientByName) {
      throw HttpError(404, "Not found");
    }

    const recipesByIngredient = await Recipes.find({
      "ingredients.id": ingredientByName[0]._id,
    })
      .skip(skip)
      .limit(limit);
    if (!recipesByIngredient) {
      throw HttpError(404, "Not found");
    }
    res.json(recipesByIngredient);
  } else {
    const result = await Recipes.find({ title: { $regex: word } })
      .skip(skip)
      .limit(limit);
    res.json(result);
  }
};
module.exports = {
  recipesCategory: ctrlWrapper(recipesCategory),
  recipesList: ctrlWrapper(recipesList),
  recipesByCategory: ctrlWrapper(recipesByCategory),
  recipesById: ctrlWrapper(recipesById),
  recipesSearch: ctrlWrapper(recipesSearch),
};
