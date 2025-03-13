const express = require("express");
const {
  validateUserData,
  checkDuplicateEmail,
} = require("../Middlewares/authMiddleware");
const { register, login } = require("../Controllers/AuthController");

const router = express.Router();

router.post("/register", validateUserData, checkDuplicateEmail, register);
router.post("/login", login);

module.exports = router;
