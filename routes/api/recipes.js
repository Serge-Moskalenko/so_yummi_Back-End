const express = require("express");
const {
  recipesCategory,
  recipesByCategory,
  recipesList,
  recipesById,
  recipesSearch,
  popularRecipes,
} = require("../../controllers/recipes");
const router = express.Router();

router.get("/category-list", recipesCategory);
router.get("/main-page/:categoryByMain", recipesList);
router.get("/byCategory/:category", recipesByCategory);
router.get("/byId/:recipesId", recipesById);
router.get("/search/:word", recipesSearch);
router.get("/popular-recipes", popularRecipes);

module.exports = router;
