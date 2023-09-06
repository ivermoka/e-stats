import connectDB from "./../../../db";
import User from "./../../../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

connectDB();

export default async function handler(req, res) {
  const { username, password } = req.query;

  try {
    console.log("Received username and password:", username, password);
    const user = await User.findOne({ username });
    console.log("User found in the database:", user);
    if (!user || user.password !== password) {
      console.log("Invalid username or password");
    } else {
      console.log("User connected:", user);
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log("Token generated:", token);
      res.send({ token: token, user: user });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
