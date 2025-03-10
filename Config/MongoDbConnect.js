const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB bağlantısı uğurla quruldu!");
  } catch (err) {
    console.error("MongoDB bağlantı xətası:", err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
