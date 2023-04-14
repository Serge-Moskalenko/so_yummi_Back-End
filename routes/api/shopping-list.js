const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/shopping-list");
const { authMiddleware } = require("../../middlewares");

router.get("/", authMiddleware, ctrl.getShoppingList);
router.delete("/:ingredientCartId", authMiddleware, ctrl.removeShoppingList);

module.exports = router;
