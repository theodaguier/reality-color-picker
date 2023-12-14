import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "./../libs/prisma";
import { User } from "@prisma/client";

const router = express.Router();

const users: User[] = [];

router.post("/auth/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  users.push(user);

  res.status(201).json({ message: "User created successfully" });
});

router.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ email }, "your-secret-key", {
    expiresIn: "15m",
  });

  res.json({ accessToken });
});

router.get("/users", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  res.json(users);
});

export default router;
