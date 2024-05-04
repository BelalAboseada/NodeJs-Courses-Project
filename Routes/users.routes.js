const express = require("express");
const router = express.Router();
const verfiyToken = require("../Middlewares/verifyToken");
const usersControllers = require("../Controllers/users.controllers");
const multer = require("multer");
const appError = require("../Utils/appError");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // cb for call back 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split("/")[0];
  if (type === "image") {
    cb(null, true);
  } else {
    cb(appError.create("file must be image", 400), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

router.route("/").get(verfiyToken, usersControllers.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), usersControllers.register);

router.route("/logIn").post(usersControllers.logIn);

module.exports = router;
