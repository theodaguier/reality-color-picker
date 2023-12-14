import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Config } from "../config/s3.config";

export async function uploadFileToS3(
  file: Buffer,
  fileName: string
): Promise<string> {
  try {
    const fileBuffer = file;

    if (!fileName || typeof fileName !== "string") {
      throw new Error("File name is undefined or not a string.");
    }

    const baseName = fileName.split(".")[0];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${baseName}.webp`,
      Body: fileBuffer,
      ContentType: "image/webp",
    };

    const command = new PutObjectCommand(params);
    await s3Config.send(command);

    // Construire l'URL en fonction des paramètres de votre bucket
    const s3URL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${baseName}.webp`;

    return s3URL;
  } catch (error) {
    console.error("🚨 Error in uploadFileToS3:", error);
    throw error;
  }
}
