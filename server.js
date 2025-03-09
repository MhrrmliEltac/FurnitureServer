const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./Config/MongoDbConnect");
const userRoutes = require("./Routers/UserRoute");
const productRoutes = require("./Routers/ProductRoute");
const projectRoutes = require("./Routers/ProjectRoute");
const emailRoutes = require("./Routers/EmailRoute");
const bodyParser = require("body-parser");

const app = express();

// Middleware-lər
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(bodyParser.json());

// Router-lər
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/project", projectRoutes);
app.use("/api", emailRoutes);
app.get("/test", async (req, res) => {
  res.send("Server is running");
});

app.get("/api/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping(); // MongoDB-nin işlədiyini test edir
    res.send("MongoDB is connected!");
  } catch (error) {
    res.status(500).send("MongoDB connection failed!");
  }
});

// MongoDB bağlantısını qur
ConnectDB()
  .then(() => console.log("✅ MongoDB bağlantısı uğurla quruldu"))
  .catch((err) => console.error("❌ MongoDB bağlantısı alınmadı:", err));

// **Vercel üçün export**
module.exports = app;

// **Əgər lokal işləyirsə, serveri başlat**
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} ünvanında işləyir`);
  });
}
