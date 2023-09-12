import Egenvurdering from "../../../models/EgenvurderingModel";
import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async (req, res) => {
  if (req.method === "PUT") {
    const {
      disclosure1,
      disclosure2,
      disclosure3,
      disclosure4,
      disclosure5,
      disclosure6,
      comment,
      date,
      user,
    } = req.body;
    const userSchema = await User.findOne({ username: user });
    const team = userSchema.team;
    const game = userSchema.game;
    console.log(team, game);
    try {
      const egenvurdering = new Egenvurdering({
        disclosure1,
        disclosure2,
        disclosure3,
        disclosure4,
        disclosure5,
        disclosure6,
        comment,
        date,
        user,
        game,
        team,
      });
      await egenvurdering.save();
      res.status(201).json({ message: "Egenvurdering registrert." });
    } catch (error) {
      res.status(500).json({
        error: "Det oppstod en feil ved registrering av egenvurdering.",
      });
    }
  }
};
