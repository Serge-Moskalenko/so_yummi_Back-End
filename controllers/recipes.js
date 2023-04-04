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
  const { categoryByMain } = req.params;

  const recipes = await Recipes.find({
    category: { $regex: categoryByMain, $options: "i" },
  })
    .limit(4)
    .sort({ favorites: -1 });

  if (recipes.length == 0) {
    throw HttpError(404, "Not found");
  }
  res.json(recipes);
};
///////
///////
const recipesByCategory = async (req, res) => {
  const { category = "Beef" } = req.params;
  console.log(category);
  const result = await Recipes.find({
    category: { $regex: category, $options: "i" },
  }).limit(8);
  if (result.length == 0) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
///////
///////
const recipesById = async (req, res) => {
  const { recipesId } = req.params;
  const recipe = await Recipes.find({ _id: { $eq: recipesId } });
  if (recipe.length == 0) {
    throw HttpError(404, "Not found");
  }
  res.json(recipe);
};
const recipesSearch = async (req, res) => {
  const { pages = 1, limit = 12, type = "title" } = req.query;

  const { word = "" } = req.params;

  const skip = (pages - 1) * limit;

  if (type.toLowerCase() === "title") {
    const result = await Recipes.find({
      title: { $regex: word, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    if (result.length == 0) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  }
  if (type.toLowerCase() === "ingredients") {
    const ingredientByName = await Ingredient.find({
      ttl: { $regex: word, $options: "i" },
    });

    if (ingredientByName.length <= 1) {
      throw HttpError(404, "Not found");
    }

    const recipesByIngredient = await Recipes.find({
      "ingredients.id": ingredientByName[0]._id,
    })
      .skip(skip)
      .limit(limit);
    if (recipesByIngredient.length <= 1) {
      throw HttpError(404, "Not found");
    }
    res.json(recipesByIngredient);
  }
};
const addRecipes = async (req, res) => {};
const removeRecipes = async (req, res) => {};
const getOwnerRecipes = async (req, res) => {};
module.exports = {
  recipesCategory: ctrlWrapper(recipesCategory),
  recipesList: ctrlWrapper(recipesList),
  recipesByCategory: ctrlWrapper(recipesByCategory),
  recipesById: ctrlWrapper(recipesById),
  recipesSearch: ctrlWrapper(recipesSearch),
  addRecipes: ctrlWrapper(addRecipes),
  removeRecipes: ctrlWrapper(removeRecipes),
  getOwnerRecipes: ctrlWrapper(getOwnerRecipes),
};
