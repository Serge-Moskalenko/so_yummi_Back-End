const express = require("express");
const {
  ingredientsList,
  recipesByIngredient,
  ingredientById,
  ingredientByName,
} = require("../../controllers/ingredients");

const router = express.Router();

router.get("/list", ingredientsList);
router.get("/:ingredient ", recipesByIngredient);
router.get("/byId/:ingredientId", ingredientById);
router.get("/byName/:ingredientName", ingredientByName);

module.exports = router;
