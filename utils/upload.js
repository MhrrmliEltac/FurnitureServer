import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";

export function upload() {
  const mongoDbUrl = `${process.env.URL}/${process.env.DB_NAME}`;
  const storage = new GridFsStorage({
    url: mongoDbUrl,
    file: (req, res) => {
      return new Promise((res, _rej) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "fileBucket",
        };
        resolve(fileInfo);
      });
    },
  });
  return multer({ storage });
}

export default upload;
