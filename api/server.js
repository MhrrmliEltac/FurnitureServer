const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("../Config/MongoDbConnect");
const userRoutes = require("../Routers/authRoute");
const productRoutes = require("../Routers/ProductRoute");
const projectRoutes = require("../Routers/ProjectRoute");
const emailRoutes = require("../Routers/EmailRoute");
const viewedRoutes = require("../Routers/RecentlyViewedRoute");
const bodyParser = require("body-parser");

const allowedOrigins = [
  "https://furnite-ui.vercel.app",
  "http://localhost:5173",
];

const app = express();

// Middleware-lər
app.use(express.json());
// Buraya frontend URL-nı əlavə et

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🟡 Incoming Origin:", origin); // Log əlavə edək
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Burada `true` yox, `origin` qaytarırıq
      } else {
        console.log("❌ Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
