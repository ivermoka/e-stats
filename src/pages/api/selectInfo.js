import connectDB from "../../../db";
import User from "../../../models/User";

connectDB();

export default async function selectGame(req, res) {
  const { game, team, user } = req.body;

  try {
    const foundUser = await User.findOne({ username: user });

    if (!foundUser) {
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
    foundUser.team = team;
    foundUser.game = game;
    await foundUser.save();
    res.status(200).json({ status: "Game and team played added." });
  } catch (error) {
    console.error("Error while adding game or team played: ", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
