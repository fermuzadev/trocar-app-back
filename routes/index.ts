import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import messageRoutes from "./messageRoutes";
import express from "express";


const app: express.Application = express();

export default (app: express.Application) => {
  app.use("/products", productRoutes);
  app.use("/auth", authRoutes);
  app.use("/orders", orderRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/", messageRoutes);
};
