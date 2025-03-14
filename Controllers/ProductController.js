const Product = require("../Models/ProductModel");
const cloudinary = require("../Config/Cloudinary"); // Cloudinary konfiqurasiyası
const fs = require("fs");

// ✅ Məhsul Yarat (Cloudinary-ə yüklə və URL-ləri MongoDB-yə yaz)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      price,
      stock,
      description,
      colors,
      structureColor,
      material,
      size,
      discountPrice,
      isOnSale,
    } = req.body;

    // Gərəkli sahələri yoxla
    if (!name || !category || !price || !req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Ad, kateqoriya, qiymət və şəkillər mütləqdir!" });
    }

    // 📌 Cloudinary-ə şəkilləri yüklə
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      uploadedImages.push(result.secure_url);
      fs.unlinkSync(file.path); // 🔥 Müvəqqəti faylı sil
    }

    let discountPercent = 0;
    if (discountPrice > 0 && discountPrice < price) {
      discountPercent = ((price - discountPrice) / price) * 100;
    }

    // 📌 Yeni məhsulu yarat və MongoDB-yə yaz
    const newProduct = new Product({
      name,
      category,
      brand,
      price,
      stock,
      description,
      colors,
      structureColor,
      material,
      size,
      images: uploadedImages, // Cloudinary URL-ləri MongoDB-də saxlanır
      discountPrice,
      discountPercent: discountPercent.toFixed(0) || 0,
      isOnSale: discountPercent > 0 && true,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Məhsul uğurla yaradıldı",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// ✅ Bütün Məhsulları Gətir
exports.getAllProducts = async (req, res) => {
  try {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://furnite-ui.vercel.app"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

exports.queryProducts = async (req, res) => {
  let { category } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
    const products = await Product.find(filter);
    res.json(products);
  }
};

// ✅ Tək Məhsulu ID ilə Gətir
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı!" });
    }

    return res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// ✅ Populyar Məhsulu ilə Gətir
exports.getPopularProduct = async (req, res) => {
  try {
    const products = await Product.find({ isPopular: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Endirimli məhsulu gətir
exports.getSaleProduct = async (req, res) => {
  try {
    const saleProducts = await Product.find({ isOnSale: true });
    res.json(saleProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Məhsulu Yenilə
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData }, // Məlumatları düzgün yenilə
      { new: true, runValidators: true } // Yenilənmiş məlumatları qaytar, validasiyanı işə sal
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Məhsul tapılmadı!" });
    }

    return res.status(200).json({
      status: "success",
      message: "Məhsul uğurla yeniləndi",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// ✅ Məhsulu Sil
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Məhsul tapılmadı!" });
    }

    return res.status(200).json({ message: "Məhsul uğurla silindi!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server xətası", error: error.message });
  }
};
