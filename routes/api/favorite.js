const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/favorite");
const { authMiddleware } = require("../../middlewares");

router.get("/", authMiddleware, ctrl.getFavoriteRecipe);
router.delete("/:recipesId", authMiddleware, ctrl.removeFavoriteRecipe);

module.exports = router;
