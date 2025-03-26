const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  favorites: { type: [String], default: [] },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
