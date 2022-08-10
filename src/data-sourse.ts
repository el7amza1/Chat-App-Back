import { DataSource } from "typeorm";
import "reflect-metadata";
import { config } from "dotenv";
import { User } from "./entities/User";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: +process.env.PGPORT!, // other way to defined it as number :Number(`${process.env.PGPORT}`),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
