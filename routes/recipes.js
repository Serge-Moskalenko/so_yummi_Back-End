const express = require("express");
const {
  recipesCategory,
  recipesByCategory,
  recipesList,
  recipesById,
} = require("../controllers/recipes");
const router = express.Router();

router.get("/category-list", recipesCategory);
router.get("/main-page", recipesList);
router.get("/byCategory/:category", recipesByCategory);
router.get("/byId/:recipesId", recipesById);

module.exports = router;
