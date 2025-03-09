const express = require("express");
const {
  uploadFile,
  getFile,
  getFileMetadata,
} = require("../Controllers/FileController");
const upload = require("../Middlewares/UploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:fileId", getFile);
router.get("/file/metadata/:fileId", getFileMetadata);

module.exports = router;
