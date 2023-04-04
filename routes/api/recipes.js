const express = require("express");
const {
  recipesCategory,
  recipesByCategory,
  recipesList,
  recipesById,
  recipesSearch,
  addFavoriteRecipe,
} = require("../../controllers/recipes");
const router = express.Router();
const { authMiddleware } = require("../../middlewares");

router.get("/category-list", recipesCategory);
router.get("/main-page/:categoryByMain", recipesList);
router.get("/byCategory/:category", recipesByCategory);
router.get("/byId/:recipesId", recipesById);
router.get("/search/:word", recipesSearch);

router.post("/byId/:recipesId", authMiddleware, addFavoriteRecipe);

module.exports = router;
