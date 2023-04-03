const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const {
  validateBody,
  authMiddleware,
  isValidId,
  upload,
} = require("../../middlewares");
const {
  userJoiRegisterSchema,
  userJoiLoginSchema,
  updateUserJoiSchema,
} = require("../../models/user");

router.post("/register", validateBody(userJoiRegisterSchema), ctrl.register);
router.get("/login", validateBody(userJoiLoginSchema), ctrl.login);
router.get("/current", authMiddleware, ctrl.current);
router.post("/logout", authMiddleware, ctrl.logout);
router.patch(
  "/updateAvatar",
  authMiddleware,
  validateBody(updateUserJoiSchema),
  upload.single("avatar"),
  ctrl.updateAvatar
);
router.patch(
  "/updateName",
  authMiddleware,
  validateBody(updateUserJoiSchema),
  ctrl.updateName
);

module.exports = router;
