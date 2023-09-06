import connectDB from "./../../../db";
import User from "./../../../models/User";

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  }
};
