import connectDB from "../../../db";
import User from "../../../models/User";

connectDB();

export default async function selectGame(req, res) {
  const { user, school } = req.body;
  console.log("school: ", school);

  try {
    const foundUser = await User.findOne({ username: user });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!school){
        console.log("School is null.");
        return res.status(404).json({ error: "School not found" });
    }
    foundUser.school = school;
    await foundUser.save();
    res.status(200).json({ status: "Game and team played added." });
  } catch (error) {
    console.error("Error while adding game or team played: ", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
