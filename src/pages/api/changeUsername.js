import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function changeUsername(req, res) {
  const { newUsername, user, password, team, school } = req.body;

  try {
    const existingUser = await User.findOne({ username: user });
    if (!existingUser.comparePassword(password)) {
      return res.status(401).json({ error: "Feil Passord" });
    }
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!school) {
      console.log("School is null.");
      return res.status(404).json({ error: "School not found" });
    }

    existingUser.team = team;
    existingUser.username = newUsername;
    existingUser.school = school;
    await existingUser.save();
    res.status(200).json({ status: "User information changed" });
  } catch (error) {
    console.error("Error while changing user information:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
