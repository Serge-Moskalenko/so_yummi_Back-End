const express = require("express");
const {
  recipesCategory,
  recipesByCategory,
  recipesList,
  recipesById,
  recipesSearch,
  addRecipes,
  removeRecipes,
  getOwnerRecipes,
} = require("../../controllers/recipes");
const { addRecipeJoiSchema } = require("../../models/recipes");
const { authMiddleware, validateBody } = require("../../middlewares/index");

const router = express.Router();

router.get("/category-list", recipesCategory);
router.get("/main-page/:categoryByMain", recipesList);
router.get("/byCategory/:category", recipesByCategory);
router.get("/byId/:recipesId", recipesById);
router.get("/search/:word", recipesSearch);
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
module.exports = router;
