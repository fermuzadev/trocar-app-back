// models/Message.js
import { model } from "mongoose";
import { mongoose } from "../db";

interface Message extends Document {
  user: any;
  message: any[]
  createdAt: Date

}


const messageSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    message: { type: [], required: true },
  },
  { timestamps: true },
);



const Message = model<Message>("Message", messageSchema);

export {Message}