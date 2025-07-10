import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routes from "./modules/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to library management",
  });
});

app.listen(config.port, () => {
  console.log(`✅ Server running on port ${config.port}`);
});

async function server() {
  try {
    await mongoose.connect(config.database_url!);
    console.log("✅ Connected to database");
  } catch (error : any) {
    console.error(`Server error : ${error}`);
  }
}

server();
