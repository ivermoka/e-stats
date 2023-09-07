import connectDB from "./../../../db";
import User from "./../../../models/User";
import bcrypt from "bcrypt"; // Import bcrypt

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({
        error: "Det finnes allerede en bruker med dette brukernavnet",
      });
    }
  }
};
