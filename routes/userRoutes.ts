import express, { Router } from "express";
import userController from "../controllers/userController";
import { expressjwt as checkJwt } from "express-jwt";
import { Secret } from "jsonwebtoken";

require("dotenv").config();

const router: Router = express.Router();

router.get("/", userController.index);
router.post("/resetPassword", userController.requestPass);
router.patch("/resetPassword/:id", userController.resetPass);
router.get(
  "/orders/:id",
  checkJwt({
    secret: (process.env.JWT_CUSTOMER_SECRET_KEY as Secret) || "",
    algorithms: ["HS256"],
  }),
  userController.getOrders,
);
router.get(
  "/:id",
  checkJwt({
    secret: (process.env.JWT_CUSTOMER_SECRET_KEY as Secret) || "",
    algorithms: ["HS256"],
  }),
  userController.show,
);
router.post("/", userController.store);
router.patch(
  "/:id",
  checkJwt({
    secret: (process.env.JWT_CUSTOMER_SECRET_KEY as Secret) || "",
    algorithms: ["HS256"],
  }),
  userController.update,
);
router.delete(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  userController.destroy,
);

export default router;
