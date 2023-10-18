import connectDB from "../../../db";
import Team from "../../../models/Team";

connectDB();

export default async function teamPage(req, res) {
  if (req.method === "POST") {
    const { selectedTeam, user, teamCode } = req.body;
    try {
      const teamSchema = await Team.findOne({ teamName: selectedTeam });
      if (teamSchema.teamCode === teamCode) {
        teamSchema.members = [...teamSchema.members, user];
        await teamSchema.save();
        res.status(200).json({ success: "Bruker lagt til team" });
      } else {
        res.status(400).json({ error: "Feil teamkode" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
  if (req.method === "DELETE") {
    const { selectedTeam, user } = req.body;
    const teamSchema = await Team.findOne({ teamName: user });
    teamSchema.requests = teamSchema.requests.filter((name) => name !== user);
    await teamSchema.save();
  }
  if (req.method === "GET") {
    try {
      console.log("Henter brukere");
      const teams = await Team.find({});
      res.status(200).json({ teams });
    } catch (error) {
      res.status(508).json({
        error: "Det oppstod en feil ved henting av brukere.",
      });
      console.log(error);
    }
  }
}
