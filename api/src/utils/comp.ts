import sharp from "sharp";

type File = Buffer;

export async function compressAndConvertImage(file: File) {
  try {
    const imageBuffer = await sharp(file)
      .resize(800, 800, { fit: "inside" })
      .webp({ quality: 80 })
      .toBuffer();

    return imageBuffer;
  } catch (error) {
    console.error("🚨 Error in compressAndConvertImage:", error);
    throw error;
  }
}
