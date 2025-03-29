const Product = require("../Models/ProductModel");

const searchProduct = async (req, res) => {
  const product = await Product.find({ name: req.query.query });

  if (!product || product.length === 0)
    return res.status(404).json({ message: "Product not found" });

  return res.status(200).json({ message: "Product find", product });
};

module.exports = searchProduct;
