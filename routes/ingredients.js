const express = require("express");
const {
  ingredientsList,
  recipesByIngredient,
} = require("../controllers/ingredients");

const router = express.Router();

router.get("/list", ingredientsList);
router.get("/", recipesByIngredient);

module.exports = router;
