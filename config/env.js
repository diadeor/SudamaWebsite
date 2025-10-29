import { config } from "dotenv";

config({ quiet: true });

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRE } = process.env;
