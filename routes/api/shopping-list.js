const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/shopping-list");
const { authMiddleware } = require("../../middlewares");

router.get("/", authMiddleware, ctrl.getShoppingList);
router.delete("/:ingredientId", authMiddleware, ctrl.removeShoppingList);

module.exports = router;
