import connectDB from "./../../../db";
import Team from "../../../models/Team";

connectDB();

export default async function handler(req, res) {
  try {
    const teams = await Team.find({});
    res.status(200).json({ teams });
  } catch (error) {
    res.status(508).json({
      error: "Det oppstod en feil ved henting av brukere.",
    });
    console.log(error);
  }
}
