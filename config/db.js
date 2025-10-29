import mongoose from "mongoose";
import { DB_URI } from "./env.js";

const ConnectDB = async () => {
  try {
    if (!DB_URI) throw new Error("!! Define database url in environment variable !!");
    const conn = await mongoose.connect(DB_URI);
    console.log("Database Connection Successful");
  } catch (error) {
    console.log("Database Connection Failed !!");
    console.error(error.message);
    process.exit(1);
  }
};

export default ConnectDB;
