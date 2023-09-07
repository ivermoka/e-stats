import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function changeUsername(req, res) {
  const { newUsername, user } = req.body;

  try {
    const existingUser = await User.findOne({ username: user });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    existingUser.username = newUsername;
    await existingUser.save();
    res.status(200).json({ status: "Username changed" });
  } catch (error) {
    console.error("Error while changing username:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
