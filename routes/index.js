const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const messageRoutes = require("./messageRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/auth", authRoutes);
  app.use("/orders", orderRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/messages", messageRoutes);
};
