import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import database from "./database";
import { logger } from "./utils";

// Routes
import { userRoutes } from "./routes/user.routes";
import { commentRoutes } from "./routes/comment.routes";
import { postRoutes } from "./routes/post.routes";

dotenv.config();
mongoose.set("strictQuery", false);
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [process.env.CLIENT_URL!, "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/like", postRoutes);

// MONGO
logger.info("Connecting to the db...");
database
  .connect()
  .then(() => {
    logger.info("DB Ready");
    app.listen(process.env.PORT, () => {
      logger.info(
        `Server listening on  >${process.env.API_URL}:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    logger.error(`Failed to connect to the DB: ${err}`);
  });
