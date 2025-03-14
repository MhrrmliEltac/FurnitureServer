const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./Config/MongoDbConnect");
const userRoutes = require("./Routers/authRoute");
const productRoutes = require("./Routers/ProductRoute");
const projectRoutes = require("./Routers/ProjectRoute");
const emailRoutes = require("./Routers/EmailRoute");
const viewedRoutes = require("./Routers/RecentlyViewedRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware-lər
app.use(express.json());
app.use(cookieParser()); // Cookie-ləri işlətmək üçün ✅

app.use(
  cors({
    origin: ["http://localhost:5173", "https://furnite-ui.vercel.app"], // İcazə verilən frontend-lər ✅
    credentials: true, // Cookie-lərin frontend-ə göndərilməsinə icazə ✅
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());

// Router-lər
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/viewed", viewedRoutes);
app.use("/api", emailRoutes);

ConnectDB();

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} ünvanında işləyir`);
  });
}
