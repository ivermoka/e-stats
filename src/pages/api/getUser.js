import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";

connectDB().then(r => console.log("Connected to DB"));

export default async function handler(req, res) {
  if (req.method === "POST") {
    const user = req.query.user;
    const date = req.query.date;
    const userSchema = await Egenvurdering.findOne({ user: user, date: date });
    if (userSchema === null) {
      res.status(201).send("No egenvurdering found");
    } else {
      res.status(202).json({ userSchema });
    }
  }
}
