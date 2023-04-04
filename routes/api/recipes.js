const express = require("express");
const {
  recipesCategory,
  recipesByCategory,
  recipesList,
  recipesById,
  recipesSearch,
  popularRecipes,
  addRecipes,
  removeRecipes,
  getOwnerRecipes,
  addFavoriteRecipe,
} = require("../../controllers/recipes");
const { addRecipeJoiSchema } = require("../../models/recipes");
const { authMiddleware, validateBody } = require("../../middlewares/index");

const router = express.Router();

router.get("/category-list", recipesCategory);
router.get("/main-page", recipesList);
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
router.post("/byId/:recipesId", authMiddleware, addFavoriteRecipe);

module.exports = router;
