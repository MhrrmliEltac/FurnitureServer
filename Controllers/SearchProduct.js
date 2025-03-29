const Product = require("../Models/ProductModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ message: "Query boş ola bilməz" });
    }

    const product = await Product.find({
      name: { $regex: query, $options: "i" },
    });

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product found", product });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = searchProduct;
