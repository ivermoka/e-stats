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
    try {
      const { user, fromDate, toDate } = req.query;
      const fromDateObject = new Date(fromDate);
      const toDateObject = new Date(toDate);
      console.log(fromDateObject, toDateObject);

      const ratings = await Egenvurdering.find({
        date: {
          $gte: fromDate,
          $lte: toDate,
        },
        username: user,
      });
      res.status(200).json({
        ratings,
      });
    } catch (error) {
      console.log("error", error);
    }
  }
}
