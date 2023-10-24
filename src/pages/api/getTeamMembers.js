import connectDB from "./../../../db";
import User from "../../../models/User";
import Team from "../../../models/Team";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { team, selectedTeam } = req.query;
    console.log(selectedTeam);
    const users = await User.find({
      team: { $in: [team] },
    });
    const teamSchema = await Team.findOne({ teamName: selectedTeam });
    try {
      res.status(200).json({ users, teamSchema });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved henting av brukere.",
      });
      console.log(error);
    }
  }
}
