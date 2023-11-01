import connectDB from "../../../db";
import User from "../../../models/User";
import Egenvurdering from "../../../models/EgenvurderingModel";
import Team from "../../../models/Team";

connectDB().then();

export default async function deleteUser(req, res) {
  const { user } = req.body;
  try {
    const userSchema = await User.findOne({ username: user });
    await Egenvurdering.deleteMany({ user: user });
    if (userSchema.team === "") {
      const team = await Team.findOne({ teamName: userSchema.team });
      team.members = team.members.filter((member) => member !== user);
      await team.save();
    }
    if (!userSchema) {
      return res.status(400).json({ status: "User not found" });
    }
    await userSchema.deleteOne();
    return res.status(200).json({ status: "User successfully deleted." });
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(400).json({ status: "Internal Server Error" });
  }
}
