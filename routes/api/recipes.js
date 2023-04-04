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
const router = express.Router();

router.get("/category-list", recipesCategory);
router.get("/main-page/:categoryByMain", recipesList);
router.get("/byCategory/:category", recipesByCategory);
router.get("/byId/:recipesId", recipesById);
router.get("/search/:word", recipesSearch);
router.post("/ownRecipes", authMiddleware, addRecipeJoiSchema, addRecipes);
router.delete("/ownRecipes/:ownRecipesId", authMiddleware, removeRecipes);
router.get("/ownRecipes", authMiddleware, getOwnerRecipes);
module.exports = router;
