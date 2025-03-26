require("dotenv").config();
const Favorite = require("../Models/FavoriteModel");
const Product = require("../Models/ProductModel");

const addFavorite = async (req, res) => {
  try {
    const { favorite } = req.body;
    const userId = req.userId; // Token-dən gələn userId

    if (!userId) {
      return res.status(401).json({ message: "İstifadəçi tapılmadı!" });
    }

    if (!favorite) {
      return res
        .status(400)
        .json({ message: "Favorit məhsul daxil edilməlidir!" });
    }

    let favoriteExists = await Favorite.findOne({ userId });

    if (!favoriteExists) {
      favoriteExists = new Favorite({ userId, favorites: [] });
    }

    if (favoriteExists.favorites.includes(favorite)) {
      return res
        .status(400)
        .json({ message: "Bu məhsul artıq favoritlərə əlavə olunub!" });
    }

    favoriteExists.favorites.push(favorite);
    await favoriteExists.save();

    res
      .status(201)
      .json({ message: "Məhsul favoritlərə əlavə edildi!", favorite });
  } catch (error) {
    console.error("Xəta:", error);
    res.status(500).json({ message: "Server xətası!" });
  }
};

const getFavorite = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "İstifadəçi tapılmadı!" });
    }

    const favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorit məhsullar tapılmadı!" });
    }

    const favoriteArr = await Product.find({
      _id: { $in: favorite.favorites },
    });
    res.status(200).json({ favoriteArr });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Don't found user!" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product id is required!" });
    }

    const favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found!" });
    }

    favorite.favorites = favorite.favorites.filter(
      (item) => item.toString() !== productId
    );
    await favorite.save();

    res.status(200).json({ message: "Product deleted from favorites!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addFavorite, getFavorite, deleteFavorite };
