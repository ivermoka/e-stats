import connectDB from "../../../db";
import Team from "../../../models/Team";

connectDB();

export default async function teamPage(req, res) {
  if (req.method === "POST") {
    const { selectedTeam, user } = req.body;
    try {
      const teamSchema = await Team.findOne({ teamName: selectedTeam });
      teamSchema.requests = [...teamSchema.requests, user];

      await teamSchema.save();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
  if (req.method === "DELETE") {
    const teamSchema = await Team.findOne({ teamName: user });
    teamSchema.requests = teamSchema.requests.filter((name) => name !== user);
    await teamSchema.save();
  }

  if (req.method === "GET") {
    try {
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
