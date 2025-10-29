import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      const error = new Error("Unauthorized: Not logged in");
      error.statusCode = 401;
      throw error;
    }

    const verify = jwt.verify(token, JWT_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
