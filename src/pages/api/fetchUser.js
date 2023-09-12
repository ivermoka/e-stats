import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const { user } = req.body;
    const userSchema = await User.findOne({ username: user });
    try {
      res.status(200).json({ userSchema });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved henting av bruker.",
      });
    }
  }
};
