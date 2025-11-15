import Customer from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRE, JWT_SECRET, GOOGLE_CLIENT_ID } from "../config/env.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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

    const { name, role, _id: id } = user;
    const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

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
          id,
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

export const changePass = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { old, newPass } = req.body;
    if (!newPass) throw new Error("New password is required");

    const user = await Customer.findById(id);
    if (user.password && !old) throw new Error("Old password is required");

    if (user.password) {
      const oldVerify = await bcrypt.compare(old, user.password);
      if (!oldVerify) throw new Error("Wrong password");
    }
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(newPass, salt);

    await Customer.findByIdAndUpdate(id, { $set: { password: hashed } }, { new: true });

    res.json({ success: true, message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  const { token } = req.body;
  if (!token) throw new Error("Token is missing");
  try {
    const ticket = await client.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();

    const { sub: googleId, name: googleName, email: googleEmail, picture } = payload;

    if (!googleEmail) throw new Error("Email not provided by google");

    let user = await Customer.findOne({ googleId });
    const userWithEmail = await Customer.findOne({ email: googleEmail });

    if (!user && userWithEmail) {
      userWithEmail.googleId = googleId;
      await userWithEmail.save();
    }

    const newUser =
      !user && !userWithEmail
        ? await Customer.create({
            googleId,
            name: googleName,
            email: googleEmail,
            role: "user",
          })
        : null;

    // If user : user else if userWithEmail : userWithEmail else newUser
    const { name, role, _id: id, email } = user ? user : userWithEmail ? userWithEmail : newUser;
    const appToken = jwt.sign(
      {
        id,
        role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE },
    );

    res.cookie("token", appToken, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        appToken,
        user: {
          id,
          name,
          email,
          role,
          googleId,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
