const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { google, googleRedirect } = require("../../controllers/google");
const { validateBody, authMiddleware } = require("../../middlewares");
const {
  userJoiRegisterSchema,
  userJoiLoginSchema,
  updateUserJoiSchema,
} = require("../../models/user");
const { upload } = require("../../middlewares");

router.post("/register", validateBody(userJoiRegisterSchema), ctrl.register);
router.get("/google", google);
router.get("/google-redirect", googleRedirect);
router.post("/login", validateBody(userJoiLoginSchema), ctrl.login);
router.get("/current", authMiddleware, ctrl.current);
router.post("/logout", authMiddleware, ctrl.logout);
router.patch(
  "/updateUser",
  authMiddleware,
  validateBody(updateUserJoiSchema),
  upload.single("avatar"),
  ctrl.updateUser
);
router.get("/countDayInfo", authMiddleware, ctrl.authDayInSoYummy);
router.get("/favoritesRecipes", authMiddleware, ctrl.authFavoritesRecipes);
router.get("/authOwnRecipes", authMiddleware, ctrl.authOwnRecipes);

module.exports = router;
