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
const { cartJoiSchema } = require("../../models/cart");
const multer = require("multer");
const { storageRecipes } = require("../../middlewares");
const upload = multer({ storageRecipes });

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
  upload.single("recipes"),
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
  validateBody(cartJoiSchema),
  addIngredientToShoppingList
);

module.exports = router;
