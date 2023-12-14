// routes/upload.route.ts
import express from "express";
import multer from "multer";
import { POST } from "../controllers/upload.controller";

const router = express.Router();

const upload = multer();

router.post("/api/upload", upload.single("tes"), POST);

export default router;
