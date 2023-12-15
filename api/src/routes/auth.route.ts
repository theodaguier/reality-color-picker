import express from "express";

import { register, login, getUsers } from "../controllers/auth.controller";

import { adminAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/register", register);

router.post("/auth/login", login);

router.get("/users", adminAuth, getUsers);

export default router;
