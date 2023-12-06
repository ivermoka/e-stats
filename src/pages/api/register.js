import connectDB from "./../../../db";
import User from "./../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, mail } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        mail: mail,
        username: username,
        password: hashedPassword,
      });
      await user.save();
      const token = jwt.sign(
        { username: username, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );
      res.status(201).json({ token: token, username: username });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
      console.log(error);
    }
  }
}
