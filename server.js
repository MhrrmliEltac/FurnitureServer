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

// MongoDB bağlantısını qur
const startServer = async () => {
  try {
    await ConnectDB(); // MongoDB-yə bağlanır

    // Router-lər
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/project", projectRoutes);
    app.use("/api", emailRoutes);

    // Serveri işə sal
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server http://localhost:${PORT} ünvanında işləyir`);
    });
  } catch (err) {
    console.error("Server başladılarkən xəta:", err);
  }
};

startServer();
