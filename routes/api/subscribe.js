const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/subscribe");
const { validateBody } = require("../../middlewares");
const { userJoiSubscribeSchema } = require("../../models/user");

router.post("/", validateBody(userJoiSubscribeSchema), ctrl.subscribeUser);

module.exports = router;
