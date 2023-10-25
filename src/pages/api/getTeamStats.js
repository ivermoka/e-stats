import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";
import User from "./../../../models/User";

connectDB();

export default async function handler(req, res) {
  try {
    const { date, user, team } = req.body;
    const ratings = await Egenvurdering.find({
      date,
      team,
    });
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(508).json({
      error: "Det oppstod en feil ved henting av brukere.",
    });
    console.log(error);
  }
}
