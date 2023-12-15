import { Request, Response } from "express";
import { uploadFileToS3 } from "../utils/upload.s3";
import { compressAndConvertImage } from "../utils/comp";

import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    const file = req.file.buffer;
    const fileName = req.file.fieldname;

    const compressedImage = await compressAndConvertImage(file);

    const s3URL = await uploadFileToS3(compressedImage, fileName);

    return res.status(200).json({
      message: "🚀 File uploaded successfully",
      url: s3URL,
    });
  } catch (e) {
    console.error("🚨 Error in POST /api/upload:", e);
    return res.status(500).json({
      message: "🚨 Error in POST /api/upload",
      error: e,
    });
  }
}
