import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";
import User from "./../../../models/User";

connectDB();

export default async function handler(req, res) {
  try {
    const { date, user, team } = req.body;
    const currentDate = new Date(date);
    const priorDate = new Date(currentDate);
    priorDate.setDate(currentDate.getDate() - 30);

    const userSchema = await User.findOne({ username: user });
    const school = userSchema.school;

    const ratings = await Egenvurdering.find({
      date: {
        $gte: priorDate,
        $lte: currentDate,
      },
      team,
      school,
    });

    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({
      error: "Det oppstod en feil ved henting av brukere.",
    });
    console.log(error);
  }
}
