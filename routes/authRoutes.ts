import express, { Router } from "express";
import authController from "../controllers/authController";

const router: Router = express.Router();

router.post("/token", authController.login);
router.post("/signup", authController.signUp);
router.get("/logout", authController.logOut);

export default router;