const { imageWithId, imageUpload } = require("../controller/imageController");
const {
  register,
  login,
  forgotPassword,
} = require("../controller/userController");

const router = require("express").Router();

router.get("/images/:userId", imageWithId);
router.post("/upload", imageUpload);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

module.exports = router;
