import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const team = req.query.team;
    const users = await User.find({
      team: { $in: [team] },
    });
    try {
      res.status(200).json({ users, team });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved henting av brukere.",
      });
      console.log(error);
    }
  }
}
