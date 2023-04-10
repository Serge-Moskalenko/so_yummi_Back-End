const authMiddleware = require("./authMiddleware");
const validateBody = require("./validateBody");
const { cloudinary, storage, storage2 } = require("./uploadMiddleware");

module.exports = {
  authMiddleware,
  validateBody,
  cloudinary,
  storage,
  storage2,
};
