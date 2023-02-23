import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(cors);

mongoose.set("strictQuery", false);
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  return res.send("HsY");
});

console.log("Connecting to the db...");
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() =>
    app.listen(process.env.PORT, async () => {
      console.log(`listening on port ${process.env.PORT}..`);
    })
  )
  .catch((err) => {
    console.log(`Failed to connect to the DB: ${err}`);
  });
