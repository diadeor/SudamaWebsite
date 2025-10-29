import Customer from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, pass } = req.body;
    if (!name) throw new Error("Name is required; Field: name");
    if (!email) throw new Error("Email is required; Field: email");
    if (!pass) throw new Error("Password is required; Field: pass");

    const role = "user";

    const userExists = await Customer.findOne({ email });
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(pass, salt);
    if (userExists) throw new Error("User already exists");

    const newUser = await Customer.create({
      name,
      email,
      password: hashed,
      role,
    });

    const token = jwt.sign({ id: newUser._id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      sameSite: "strict",
    });
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: newUser._id,
          name,
          email,
          role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    if (!email) throw new Error("Email is required; Field: email");
    if (!pass) throw new Error("Password is required; Field: pass");

    const user = await Customer.findOne({ email });
    if (!user) throw new Error("Invalid Email");

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) throw new Error("Password does not match");

    const { name, role } = user;
    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          id: user._id,
          name,
          email,
          role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("User not logged in");
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: true, maxAge: 1 });

    res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
