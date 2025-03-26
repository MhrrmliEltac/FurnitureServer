const express = require("express");
const router = express.Router();
const Favorite = require("../Controllers/FavoriteController");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log(req.cookies);

  if (!token) {
    return res.status(401).json({ message: "İcazəsiz giriş! Token yoxdur." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.id) {
      return res.status(403).json({ message: "Token etibarsızdır!" });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get("/get-favorite", verifyToken, Favorite.getFavorite);
router.post("/add-favorite", verifyToken, Favorite.addFavorite);
router.delete("/remove-favorite/:id", verifyToken, Favorite.deleteFavorite);

module.exports = router;
