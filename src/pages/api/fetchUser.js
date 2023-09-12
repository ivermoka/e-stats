import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const user = req.query.user;
    const userSchema = await Egenvurdering.findOne({ user: user });
    try {
      res.status(200).json({ userSchema });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved henting av bruker.",
      });
    }
  }
};
