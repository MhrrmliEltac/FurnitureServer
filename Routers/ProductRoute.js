const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");
const upload = require("../Middlewares/Upload"); // Multer konfiqurasiyası

router.post(
  "/create",
  upload.array("images", 5),
  productController.createProduct
); // ✅ Məhsul Yarat
router.get("/", productController.getAllProducts); // ✅ Bütün məhsulları gətir
router.get("/category", productController.queryProducts);
router.get("/:id", productController.getProductById); // ✅ Tək məhsulu gətir
router.get("/popular", productController.getPopularProduct); // ✅ Populyar məhsulu gətir
router.get("/sale", productController.getSaleProduct); // ✅ Endirimli məhsulu gətir
router.put("/:id", productController.updateProduct); // ✅ Məhsulu yenilə
router.delete("/:id", productController.deleteProduct); // ✅ Məhsulu sil

module.exports = router;
