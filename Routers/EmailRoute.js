const express = require("express");
const { sendEmail } = require("../Controllers/SendEmail");
const router = express.Router();

router.post("/send-email", sendEmail);

module.exports = router;
