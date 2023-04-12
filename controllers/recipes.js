const cloudinary = require("cloudinary").v2;
const { default: mongoose } = require("mongoose");
const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Ingredient } = require("../models/ingredient");
const { Recipes } = require("../models/recipes");
const { User } = require("../models/user");
const { Cart } = require("../models/cart");

const ObjectId = mongoose.Types.ObjectId;
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
//

const mainPage = async (req, res, next) => {
  const result = await Recipes.aggregate([
    {
      $match: {
        category: {
          $in: ["Breakfast", "Miscellaneous", "Chicken", "Dessert"],
        },
      },
    },
    { $sort: { category: 1 } },
    { $group: { _id: "$category", items: { $push: "$$ROOT" } } },
    { $project: { meals: { $slice: ["$items", 4] } } },
    { $limit: 4 },
  ]);

  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

///////
const recipesCategory = async (req, res) => {
  const categories = [...categoriesType].sort();
  res.json(categories);
};
///////
///////

///////
///////
const recipesByCategory = async (req, res) => {
  const { category = "Beef" } = req.params;

  const result = await Recipes.find({
    category: { $regex: category, $options: "i" },
  }).limit(8);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
///////
///////
const recipesById = async (req, res) => {
  const { recipesId } = req.params;

  const recipe = await Recipes.aggregate([
    { $match: { _id: ObjectId(recipesId.toString()) } },
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingr_nfo",
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: "$ingredients",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$ingr_nfo",
                    {
                      $indexOfArray: ["$ingr_nfo._id", "$$this.id"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ["ingr_nfo", "ingredients.id"],
    },
  ]);

  if (!recipe) {
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
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  if (type.toLowerCase() === "ingredients") {
    const ingredientByName = await Ingredient.find({
      ttl: { $regex: word, $options: "i" },
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
  }
};

const popularRecipes = async (req, res) => {
  const recipesByPopular = await Recipes.aggregate([
    {
      $project: {
        title: 1,
        description: 1,
        preview: 1,
        numberOfFavorites: {
          $cond: {
            if: { $isArray: "$favorites" },
            then: { $size: "$favorites" },
            else: "NA",
          },
        },
      },
    },
    { $sort: { numberOfFavorites: -1 } },
    { $limit: 4 },
  ]);
  if (!recipesByPopular) {
    throw HttpError(404);
  }

  res.json(recipesByPopular);
};

const addRecipes = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw HttpError(401);
  }
  const { preview, title } = req.body;

  if (preview) {
    try {
      const previewNew = "data:image/png;base64," + preview.toString();
      const uploadedImage = await cloudinary.uploader.upload(previewNew, {
        folder: "recipes",
      });
      req.body.preview = uploadedImage.url;
    } catch (error) {}
  }
  const result = await Recipes.create({
    ...req.body,
    owner: user._id,
  });
  if (!result) {
    throw HttpError(404);
  }

  return res
    .status(201)
    .json({ data: { result, message: "Recipe added successfully" } });
};

const removeRecipes = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw HttpError(401);
  }
  const { ownRecipesId } = req.params;
  const recipe = await Recipes.deleteOne({
    $and: [{ _id: { $eq: ownRecipesId } }, { owner: { $eq: user._id } }],
  });
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  res.json({
    data: {
      message: "Recipes deleted",
    },
  });
};

const getOwnerRecipes = async (req, res) => {
  const { pages = 1, limit = 4 } = req.query;
  const skip = (pages - 1) * limit;

  const user = req.user;
  if (!user) {
    throw HttpError(401);
  }
  const result = await Recipes.find({ owner: { $eq: user._id } })
    .skip(skip)
    .limit(limit);

  res.json(result);
};

const addFavoriteRecipe = async (req, res) => {
  const { _id } = req.user;
  const { recipesId } = req.params;
  const recipe = await Recipes.find({ _id: { $eq: recipesId } });
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  const data = await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        favorite: {
          $each: recipe,
          $position: 0,
        },
      },
    },
    { new: true }
  );
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(...recipe);
};

const addIngredientToShoppingList = async (req, res) => {
  const { _id } = req.user;
  const { ingredientId, measure } = req.body;
  if (!req.user) {
    throw HttpError(401);
  }
  const ingredientInfo = await Ingredient.aggregate([
    { $match: { _id: ObjectId(ingredientId.toString()) } },
    { $project: { _id: 0, ttl: 1, thb: 1 } },
  ]);
  const data = await Cart.create({
    ...req.body,
    ingredientInfo: ingredientInfo,
    owner: _id,
  });
  if (!data) {
    throw HttpError(404);
  }
  const result = await User.findByIdAndUpdate(
    _id,
    {
      $push: { shoppingList: data },
    },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ message: "Ingredient added to cart" });
};

module.exports = {
  recipesCategory: ctrlWrapper(recipesCategory),

  recipesByCategory: ctrlWrapper(recipesByCategory),
  recipesById: ctrlWrapper(recipesById),
  recipesSearch: ctrlWrapper(recipesSearch),

  popularRecipes: ctrlWrapper(popularRecipes),

  addRecipes: ctrlWrapper(addRecipes),
  removeRecipes: ctrlWrapper(removeRecipes),
  getOwnerRecipes: ctrlWrapper(getOwnerRecipes),

  addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
  mainPage: ctrlWrapper(mainPage),

  addIngredientToShoppingList: ctrlWrapper(addIngredientToShoppingList),
};
