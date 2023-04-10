const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowedFormats: ["jpg", "png"],
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storage2 = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes",
    allowedFormats: ["jpg", "png"],
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    console.log(file.originalname, "orin name");
  },
});

module.exports = {
  cloudinary,
  storage,
  storage2,
};
