import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const user = req.query.user;
    const date = req.query.date;
    const userSchema = await Egenvurdering.findOne({ user: user, date: date });
    try {
      res.status(200).json({ userSchema });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved henting av bruker.",
      });
    }
  } else if (req.method === "GET") {
    const user = req.query.user;
    const date = req.query.date;
    const userSchema = await Egenvurdering.findOne({ user: user, date: date });
    if (userSchema === null) {
      res.status(200).json("null");
    }
  }
}
