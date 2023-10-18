import connectDB from "./../../../db";
import Team from "../../../models/Team";
import User from "./../../../models/User";

connectDB();

export default async function handler(req, res) {
  const { teamName, username, teamCode } = req.body;
  try {
    const team = new Team({
      teamName: teamName,
      members: username,
      teamCode: teamCode,
    });
    await team.save();

    const user = await User.findOne({ username: username });
    user.team = teamName;
    await user.save();
    res.status(200).json({ success: "Team created" });
  } catch (error) {
    res.status(500).json({
      error: "Feil ved oppretting av team",
    });
    console.log(error);
  }
}
