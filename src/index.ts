
import mongoose from "mongoose";
import express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { gptRouter } from "./routes/gptRouter";

const app = express();

app.use(json());
app.use(gptRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  return next(new Error('Invalid route'));
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message || "an unknown error occurred!",
  });
});

// Connecting to Mongodb
const initializeConfig = async () => {
  try {
    await mongoose.connect('mongodb+srv://RookieAND:9oormthon_raid2@cluster0.2wznhps.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDb')
  } catch (error) {
    console.log(error)
  }
}

app.listen(3000, async () => {
  await initializeConfig()
  console.log("Listening on port 3000!!!!!");
});
