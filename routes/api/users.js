const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { google, googleRedirect } = require("../../controllers/google");
const {
  validateBody,
  authMiddleware,
  isValidId,
} = require("../../middlewares");
const {
  userJoiRegisterSchema,
  userJoiLoginSchema,
  updateUserJoiSchema,
} = require("../../models/user");

router.post("/register", validateBody(userJoiRegisterSchema), ctrl.register);
router.get("/google", google);
router.get("/google-redirect", googleRedirect);
router.get("/login", validateBody(userJoiLoginSchema), ctrl.login);
router.get("/current", authMiddleware, ctrl.current);
router.post("/logout", authMiddleware, ctrl.logout);
// router.patch(
//   "/:userId",
//   authMiddleware,
//   isValidId,
//   validateBody(updateUserJoiSchema),
//   ctrl.updateUserById
// );

module.exports = router;
