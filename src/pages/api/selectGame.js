import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function selectGame(req, res) {
  const { game, user } = req.body;
  console.log(game);

  try {
    const foundUser = await User.findOne({ username: user });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    foundUser.gamePlayed = game;
    await foundUser.save();
    res.status(200).json({ status: "Game played added." });
  } catch (error) {
    console.error("Error while adding game played: ", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
