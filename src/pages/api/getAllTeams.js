import connectDB from "./../../../db";

const mongoose = require("mongoose");
const Team = mongoose.model("Teams");

connectDB();

export default async function handler(req, res) {
  try {
    const teams = await Team.find({});
    console.log(teams);
    res.status(200).json({ teams });
  } catch (error) {
    res.status(508).json({
      error: "Det oppstod en feil ved henting av brukere.",
    });
    console.log(error);
  }
}
