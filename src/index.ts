import express, { json, urlencoded } from "express";
import { AppDataSource } from "./data-sourse";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(json());
server.use(urlencoded({ extended: false }));

server.listen(process.env.PORT, async () => {
  console.log(`now you connected by port No ${process.env.PORT}`);
  try {
    await AppDataSource.initialize();
    console.log("now you connected to database");
  } catch (error) {
    console.log(error);
  }
});
