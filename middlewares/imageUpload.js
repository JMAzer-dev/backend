const multer = require("multer");
const path = require("path");

// Handle Storage
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //09231902380.jpeg
  },
});

// Handle Image Upload
const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    // Upload only png and jpg format
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Extensões aceitas: jpg e png"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
