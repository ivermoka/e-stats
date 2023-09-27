import connectDB from "./../../../db";
import Team from "./../../../models/Team";
import User from "./../../../models/User";

connectDB();

export default async function handler(req, res) {
  const teamName = req.body.teamName;
  const username = req.body.username;
  try {
    const team = new Team({
      teamName: teamName,
      members: username,
    });
    await team.save();

    const user = await User.findOne({ username: username });
    user.team = team.teamName;
    await user.save();
    res.status(200).json({ success: "Team created" });
  } catch (error) {
    res.status(500).json({
      error: "Feil ved oppretting av team",
    });
    console.log(error);
  }
}
