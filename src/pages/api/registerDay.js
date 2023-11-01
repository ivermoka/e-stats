import Egenvurdering from "../../../models/EgenvurderingModel";
import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      disclosure1,
      disclosure2,
      disclosure3,
      disclosure4,
      disclosure5,
      date,
      user,
    } = req.body;
    const userSchema = await User.findOne({ username: user });
    const team = userSchema.team;
    try {
      if (userSchema.team === "") {
        return res.status(500).json({
          message: "Du må velge lag før du kan registrere egenvurdering.",
        });
      }
      const egenvurdering = new Egenvurdering({
        disclosure1,
        disclosure2,
        disclosure3,
        disclosure4,
        disclosure5,
        date,
        user,
        team,
        school: userSchema.school,
        hasRatedPart2: false,
      });
      await egenvurdering.save();
      res.status(201).json({ message: "Egenvurdering registrert." });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved registrering av egenvurdering.",
      });
    }
  }
  if (req.method === "POST") {
    const { disclosure6, comment, date, user } = req.body;
    const egenvurdering = await Egenvurdering.findOne({
      user: user,
      date: date,
    });
    const userSchema = await User.findOne({ username: user });
    try {
      egenvurdering.disclosure6 = disclosure6;
      egenvurdering.comment = comment;
      egenvurdering.hasRatedPart2 = true;
      egenvurdering.school = userSchema.school;
      await egenvurdering.save();
      res.status(201).json({ message: "Egenvurdering oppdatert." });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved oppdatering av del 2 av egenvurdering.",
      });
      console.log(error);
    }
  }
}
