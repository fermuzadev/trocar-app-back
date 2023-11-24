import express, { Router } from "express";
import adminController from "../controllers/adminController";
import { expressjwt as checkJwt } from "express-jwt";
import { Secret } from "jsonwebtoken";

require("dotenv").config();

const router: Router = express.Router();

router.get("/", adminController.index);
router.post("/token", adminController.login);
router.post(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  adminController.store,
);
router.patch(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  adminController.update,
);
router.delete(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  adminController.destroy,
);

export default router;
