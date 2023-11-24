import express, { Router } from "express";
import messageController from "../controllers/messageController";

const router: Router = express.Router();

router.get("/", messageController.index);

export default router;
