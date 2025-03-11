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
    dimensions: {
      width: { type: String },
      depth: { type: String },
      height: { type: String },
      seatHeight: { type: String },
    },
    style: { type: [String] }, // Dizayn stilləri (məsələn, Modern, Scandinavian)
    images: { type: [String], required: true }, // Şəkillərin URL-ləri
    category: { type: String, required: true }, // Kategoriya (məs: Table, Chair)
    subCategory: { type: String }, // Alt-kategoriya (məs: Living Room Table)
    isPopular: { type: Boolean, default: false }, // Populyar məhsul olub-olmaması
    isOnSale: { type: Boolean, default: false }, // Endirimdə olub-olmaması
    stock: { type: Number, default: 0 },
  },
  { timestamps: true } // `createdAt` və `updatedAt` avtomatik əlavə edilir
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
