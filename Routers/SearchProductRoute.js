const express = require("express");
const searchProduct = require("../Controllers/SearchProduct");
const router = express.Router();

router.get("/search", searchProduct);

module.exports = router;
