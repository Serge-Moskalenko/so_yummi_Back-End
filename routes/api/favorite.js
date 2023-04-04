const express = require("express");
const router = express.Router();
const { User } = require("../../models/user");
const ctrl = require("../../controllers/favorite");
const { authMiddleware } = require("../../middlewares");

router.post("/", authMiddleware, ctrl.add);
router.delete("/", authMiddleware, ctrl.remove);

module.exports = router;
