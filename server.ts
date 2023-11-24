import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import routes from "./routes";
import {Message} from "./models/Message";

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3000;
const app: Application = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

io.on("connection", async (socketClient: Socket) => {
  const messages = await Message.find();
  console.log(`A new client is connected 👌 (${socketClient.id}) `);
  socketClient.emit("messages", messages);
  socketClient.on("disconnect", () => {
    console.log(`Client id ${socketClient.id} disconnected`);
  });

  socketClient.on("new-message", async ({ username, text }: { username: string; text: string }) => {
    const newMessage = await Message.create({
      user: username,
      message: text,
    });
    io.emit("messages", [newMessage]);
  });

  io.emit("message_everyone", `Client connected😎`);
  socketClient.broadcast.emit("new-client");
});

serverHttp.listen(APP_PORT, () => {
  console.log(`\n[Express] Server running on port ${APP_PORT}.`);
  console.log(`[Express] Go to http://localhost:${APP_PORT}.\n`);
});

process.on("SIGINT", () => {
  const { mongoose } = require("./db");
  mongoose.connection.close(() => {
    console.log("Mongoose default connection is disconnected due to application termination.\n");
    process.exit(0);
  });
});