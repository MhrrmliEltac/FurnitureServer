const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/MongoDbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware-lər
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://furnite-ui.vercel.app"], // İcazə verilən frontend-lər ✅
    credentials: true, // Cookie-lərin frontend-ə göndərilməsinə icazə ✅
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());

const userRoutes = require("./Routers/authRoute");
const productRoutes = require("./Routers/ProductRoute");
const projectRoutes = require("./Routers/ProjectRoute");
const emailRoutes = require("./Routers/EmailRoute");
const viewedRoutes = require("./Routers/RecentlyViewedRoute");
const favoriteRoutes = require("./Routers/FavoriteRouter");
const searchProductRoutes = require("./Routers/SearchProductRoute");

// Router-lər
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/viewed", viewedRoutes);
app.use("/api", emailRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api", searchProductRoutes);

ConnectDB();

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} ünvanında işləyir`);
  });
}
