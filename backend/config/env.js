import { config } from "dotenv";

config({ quiet: true });

export const {
  PORT,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
} = process.env;
