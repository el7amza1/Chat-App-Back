import express, { json, urlencoded } from "express";
import { AppDataSource } from "./data-sourse";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/users";
import messageRouter from "./routes/messages";
import chatRouter from "./routes/chat";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// const http = require("http").Server(app);
// const io = require("socket.io")(http);
// const io = new Server(app);

app.get("/", (req, res) => {
  res.json({ message: "new client connected" });
});

io.on("connection", (socket: any) => {
  // send a message to the client
  // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
  console.log("new client");

  // receive a message from the client
  // socket.on("hello from client", (...args) => {
  // ...
  // });
});

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/messages", messageRouter);
app.use("/chats", chatRouter);

// server.listen(4500);
server.listen(process.env.PORT, async () => {
  console.log(`now you connected by port No ${process.env.PORT}`);
  try {
    await AppDataSource.initialize();
    console.log("now you connected to database");
  } catch (error) {
    console.log(error);
  }
});
