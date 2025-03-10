const mongoose = require("mongoose");

const RecentlyViewedSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  viewedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RecentlyViewed", RecentlyViewedSchema);
