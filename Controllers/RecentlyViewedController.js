const RecentlyViewed = require("../Models/RecentlyViewedModel");

exports.createRecentlyViewed = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.params.userId;

  try {
    if (!itemId || !userId) {
      return res
        .status(400)
        .json({ message: "Item ID and User ID are required" });
    }

    const existingView = await RecentlyViewed.findOne({ userId, itemId });

    if (existingView) {
      return res
        .status(400)
        .json({ message: "You have already viewed this item" });
    }

    const newView = new RecentlyViewed({
      userId,
      itemId,
    });

    await newView.save();

    return res
      .status(200)
      .json({ message: "View recorded successfully", data: newView });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getRecentlyViewed = async (req, res) => {
  const userId = req.params.userId;

  try {
    const recentViews = await RecentlyViewed.find({ userId })
      .populate("itemId")
      .sort({ viewedAt: -1 });

    return res.status(200).json(recentViews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
