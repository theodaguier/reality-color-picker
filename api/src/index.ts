import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import uploadRouter from "./routes/upload.route";

dotenv.config();

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(process.env.LOCAL_PORT, () => {
  console.log(
    `💫 Server is running on http://localhost:${process.env.LOCAL_PORT} 💫`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(uploadRouter);
