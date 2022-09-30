import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();

import "./database";

import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import studentRoutes from "./routes/studentRoutes";
import photoRoutes from "./routes/photoRoutes";

import express from "express";
import cors from "cors";
// import helmet from "helmet";
import delay from "express-delay";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(delay(2000));
    // this.app.use(
      // helmet({
        // crossOriginResourcePolicy: false,
      // })
    // );
    this.app.use(express.static(resolve(__dirname, "..", "uploads")));
  }

  routes() {
    this.app.use(homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/students", studentRoutes);
    this.app.use("/photos", photoRoutes);
  }
}

export default new App().app;
