require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
const express = require("express");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

io.on("connection", async (socketClient) => {
  const messages = await Message.find();
  console.log(`A new client is connected 👌 (${socketClient.id}) `);
  socketClient.emit("messages", messages);
  socketClient.on("disconnect", () => {
    console.log(`Client id ${socketClient.id} disconnected`);
  });

  socketClient.on("new-message", async ({ username, text }) => {
    let messages = await Message.create({
      user: username,
      message: text,
    });
    io.emit("messages", messages);
  });

  io.emit("message_everyone", `Client connected😎`);
  socketClient.broadcast.emit("new-client");
});

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});

process.on("SIGINT", function () {
  const { mongoose } = require("./db");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection is disconnected due to application termination.\n");
    process.exit(0);
  });
});
