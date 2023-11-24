import express, { Router } from "express";
import orderController from "../controllers/orderController";
import { expressjwt as checkJwt } from "express-jwt";
import { Secret } from "jsonwebtoken";

require("dotenv").config();

const router: Router = express.Router();

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post(
  "/",
  checkJwt({
    secret: (process.env.JWT_CUSTOMER_SECRET_KEY as Secret) || "",
    algorithms: ["HS256"],
  }),
  orderController.store,
);
router.patch(
  "/:id",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  orderController.update,
);
router.delete(
  "/",
  checkJwt({ secret: (process.env.JWT_ADMIN_SECRET_KEY as Secret) || "", algorithms: ["HS256"] }),
  orderController.destroy,
);

export default router;
