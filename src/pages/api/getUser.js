import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";
import User from "../../../models/User";

connectDB().then();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const user = req.query.user;
      const date = req.query.date;
      const userSchema = await Egenvurdering.findOne({
        user: user,
        date: date,
      });

      if (userSchema === null) {
        res.status(201).send("No egenvurdering found");
      } else {
        if (!userSchema.hasRatedPart2) {
          res.status(203).json({ userSchema });
        } else if (userSchema.hasRatedPart2) {
          res.status(204).json({ userSchema });
        }
      }
    } else if (req.method === "PUT") {
      const { user } = req.body;
      console.log(user)
      const userInfo = await User.findOne({ username: user });
      res.status(200).json(userInfo);
    } else {
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
