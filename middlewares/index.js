const authMiddleware = require("./authMiddleware");
const validateBody = require("./validateBody");
const { upload } = require("./uploadMiddleware");

module.exports = {
  authMiddleware,
  validateBody,
  upload,
};
