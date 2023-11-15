import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function forgotPassword(req, res) {
  const { user } = req.query;

  try {
    const userSchema = await User.findOne({ username: user });
    res.status(200).json({ userSchema });
  } catch (error) {
    console.error("Error while changing user information:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
