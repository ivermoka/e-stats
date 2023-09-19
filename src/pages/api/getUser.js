import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const user = req.query.user;
    const date = req.query.date;
    const userSchema = await Egenvurdering.findOne({ user: user, date: date });
    console.log(userSchema);
    if (userSchema === null) {
      res.status(201).send("No egenvurdering found");
    } else if (userSchema !== null) {
      res.status(202).json({ userSchema });
    }
  }
};
