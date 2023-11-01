import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";
import User from "./../../../models/User";

connectDB();

function monthAbbreviationToNumber(abbreviation) {
  const monthAbbreviations = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  return monthAbbreviations[abbreviation];
}

export default async function handler(req, res) {
  try {
    const { date, team } = req.body;
    const currentDate = new Date(date);
    const priorDate = new Date(
      new Date().setDate(currentDate.getDate() - 30),
    ).toLocaleDateString();
    const currentDateFormatted = currentDate.toLocaleDateString();
    const ratings = await Egenvurdering.find({
      date: {
        $gte: priorDate,
        $lte: currentDateFormatted,
      },
      team,
    });
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(508).json({
      error: "Det oppstod en feil ved henting av brukere.",
    });
    console.log(error);
  }
}
