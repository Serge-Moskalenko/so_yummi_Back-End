const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users");

router.post("/register");
router.get("/login");
router.post("/logout");
router.get("/current");
router.patch("/");

module.exports = router;
