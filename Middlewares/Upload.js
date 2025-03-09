const multer = require("multer");
const path = require("path");

// Multer konfiqurasiyası (şəkilləri müvəqqəti yükləmək üçün)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Müvəqqəti saxlama yeri
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unikal ad təyin et
  },
});

// Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5MB fayl ölçüsü
});

module.exports = upload;
