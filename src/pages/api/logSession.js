import connectDB from "./../../../db";
import Session from "./../../../models/Session";

connectDB();

export default async function handler(req, res) {
  const {
    user,
    food,
    sleep,
    motivation,
    physical,
    psychological,
    played,
    comment,
  } = req.body;

  try {
    const session = new Session({
      user: user,
      food: food,
      sleep: sleep,
      motivation: motivation,
      physical: physical,
      psychological: psychological,
      played: played,
      comment: comment,
    });
    await session.save();
  } catch (error) {
    res.status(500);
  }
}
