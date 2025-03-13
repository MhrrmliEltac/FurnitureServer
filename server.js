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

const app = express();

// Middleware-lər
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
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
