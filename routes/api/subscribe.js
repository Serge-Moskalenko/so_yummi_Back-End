const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/subsctibe");
const { validateBody, authMiddleware } = require("../../middlewares");
const { userJoiSubscribeSchema } = require("../../models/user");

router.post("/", validateBody(userJoiSubscribeSchema), ctrl.subscribeUser);

module.exports = router;
