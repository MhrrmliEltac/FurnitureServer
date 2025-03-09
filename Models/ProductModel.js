const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    discountPercent: { type: Number },
    description: { type: String },
    colors: { type: [String] }, // Rənglər siyahısı
    structureColor: { type: [String] }, // Struktur rəngi
    material: { type: [String] }, // Material növləri
    size: { type: [String] }, // Ölçü variantları
    images: { type: [String], required: true }, // Şəkillərin URL-ləri
    category: { type: String, required: true }, // Kategoriya (məs: Table, Chair)
    subCategory: { type: String }, // Alt-kategoriya (məs: Living Room Table)
    isPopular: { type: Boolean, default: false }, // Populyar məhsul olub-olmaması
    isOnSale: { type: Boolean, default: false }, // Endirimdə olub-olmaması
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
