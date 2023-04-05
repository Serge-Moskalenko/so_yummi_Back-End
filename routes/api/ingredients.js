const express = require("express");
const {
  ingredientsList,
  recipesByIngredient,
  ingredientById,
  ingredientByName,
  addIngredientToShoppingList,
} = require("../../controllers/ingredients");
const { authMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/list", ingredientsList);
router.get("/:ingredient", recipesByIngredient);
router.get("/byId/:ingredientId", ingredientById);
router.get("/byName/:ingredientName", ingredientByName);

router.post("/byId/:ingredientId", authMiddleware, addIngredientToShoppingList);

module.exports = router;
