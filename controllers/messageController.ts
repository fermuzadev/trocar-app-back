import { Request, Response } from "express";
import {Message} from "../models/Message";

async function index(req: Request, res: Response) {
  try {
    const messages = await Message.find();
    return res.json(messages);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export default { index };