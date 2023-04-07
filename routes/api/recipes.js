const express = require("express");
const {
  recipesCategory,
  recipesByCategory,
  recipesList,
  recipesById,
  recipesSearch,

  mainPage,
  popularRecipes,

  addRecipes,
  removeRecipes,
  getOwnerRecipes,
  addFavoriteRecipe,
  addIngredientToShoppingList,
} = require("../../controllers/recipes");
const { addRecipeJoiSchema } = require("../../models/recipes");
const { authMiddleware, validateBody } = require("../../middlewares/index");

const router = express.Router();

router.get("/main-page", mainPage);

router.get("/category-list", recipesCategory);

router.get("/byCategory/:category", recipesByCategory);
router.get("/byId/:recipesId", recipesById);
router.get("/search/:word", recipesSearch);
router.get("/popular-recipes", popularRecipes);

router.post(
  "/ownRecipes/addRecipe",
  authMiddleware,
  validateBody(addRecipeJoiSchema),
  addRecipes
);
router.delete(
  "/ownRecipes/removeRecipe/:ownRecipesId",
  authMiddleware,
  removeRecipes
);
router.get("/ownRecipes/getRecipes", authMiddleware, getOwnerRecipes);
router.post("/byIdToFavorite/:recipesId", authMiddleware, addFavoriteRecipe);
router.post(
  "/byIdToShoplist/:recipesId",
  authMiddleware,
  addIngredientToShoppingList
);

module.exports = router;
