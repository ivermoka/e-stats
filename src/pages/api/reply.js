import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";

connectDB();

export default async function handler(req, res) {
  const { reply, id, user } = req.body;
  try {
    const rating = await Egenvurdering.findById(id);
    rating.comment =
      rating.comment + "\n\n<strong>" + user + ": " + reply + "</strong>";
    rating.adminRated = true;
    console.log(rating);
    await rating.save();
    console.log(rating);
  } catch (error) {
    res.status(508).json({
      error: "Det oppstod en feil ved henting av brukere.",
    });
    console.log(error);
  }
}
