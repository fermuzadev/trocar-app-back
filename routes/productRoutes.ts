import express, { Router } from "express";
import productController from "../controllers/productController";
import { expressjwt as checkJwt } from "express-jwt";
import { Secret } from "jsonwebtoken";

require("dotenv").config();

const router: Router = express.Router();

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  productController.store,
);
router.patch(
  "/:id",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  productController.update,
);
router.delete(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  productController.destroy,
);

export default router;
