import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function changeUsername(req, res) {
  const { newUsername, user, password, game, team } = req.body;

  try {
    const existingUser = await User.findOne({ username: user });
    if (!existingUser.comparePassword(password)) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!game) {
      console.log("Game is null.");
      return res.status(404).json({ error: "Game not found" });
    }
    if (!team) {
      console.log("Team is null.");
      return res.status(404).json({ error: "Team not found" });
    }

    existingUser.team = team;
    existingUser.game = game;
    existingUser.username = newUsername;
    await existingUser.save();
    res.status(200).json({ status: "User information changed" });
  } catch (error) {
    console.error("Error while changing user information:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
