import { Request, Response } from "express";
import { uploadFileToS3 } from "../utils/upload.s3";

import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request, res: Response) {
  try {
    console.log("req", req);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file.buffer;
    const fileName = req.file.fieldname;

    const s3URL = await uploadFileToS3(file, fileName);

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
