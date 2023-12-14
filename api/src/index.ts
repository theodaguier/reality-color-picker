import express, { Request, Response } from "express";
import dotenv from "dotenv";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(process.env.LOCAL_PORT, () => {
  console.log(
    `💫 Server is running on http://localhost:${process.env.LOCAL_PORT} 💫`
  );
});
