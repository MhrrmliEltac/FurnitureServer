const express = require("express");
const {
  createRecentlyViewed,
  getRecentlyViewed,
} = require("../Controllers/RecentlyViewedController");
const router = express.Router();

router.post("/recently-viewed/:userId", createRecentlyViewed);
router.get("/recently-viewed/:userId", getRecentlyViewed);

module.exports = router;
