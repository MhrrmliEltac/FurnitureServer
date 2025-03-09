const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

let bucket;

const initBucket = (db) => {
  bucket = new GridFSBucket(db, { bucketName: "myCustomBucket" });
  console.log("GridFSBucket initialized.");
};

uploadFile = (req, res) => {
    if (!req.file) {
      return res.status(400).send("Fayl seçilməlidir.");
    }
  
    if (!bucket) {
      return res.status(500).send("GridFSBucket hazır deyil.");
    }
  
    const filePath = path.join(__dirname, "../", req.file.path);
    const uploadStream = bucket.openUploadStream(req.file.originalname);
  
    fs.createReadStream(filePath)
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error("Fayl yüklənərkən xəta:", err);
        res.status(500).send("Fayl yüklənərkən xəta baş verdi.");
      })
      .on("finish", () => {
        const fileId = uploadStream.id.toString(); // ID-ni string kimi qaytarırıq
        res.status(200).json({
          message: "Fayl uğurla yükləndi.",
          fileId, // Faylın ID-sini qaytarırıq
          filename: req.file.originalname,
        });
  
        fs.unlink(filePath, (err) => {
          if (err) console.error("Müvəqqəti fayl silinərkən xəta:", err);
        });
      });
  };
  

const getFile = (req, res) => {
  if (!bucket) return res.status(500).send("GridFSBucket hazır deyil.");
  try {
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.fileId)
    );
    downloadStream.pipe(res);
  } catch (err) {
    res.status(404).send("Fayl tapılmadı.");
  }
};

const getFileMetadata = async (req, res) => {
  if (!bucket) return res.status(500).send("GridFSBucket hazır deyil.");
  try {
    const files = await bucket
      .find({ _id: new mongoose.Types.ObjectId(req.params.fileId) })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: "Fayl tapılmadı." });
    }
    res.json(files[0]);
  } catch (err) {
    res.status(500).send("Xəta baş verdi.");
  }
};

module.exports = { initBucket, uploadFile, getFile, getFileMetadata };
