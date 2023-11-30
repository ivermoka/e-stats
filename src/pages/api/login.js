import connectDB from "./../../../db";
import User from "./../../../models/User";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  const { username, password } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({ status: "Wrong username or password" });
    } else {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1M" },
      );

      res.status(200).json({ token: token, username: user.username });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
