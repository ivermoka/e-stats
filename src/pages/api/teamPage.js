import connectDB from "../../../db";
import Team from "../../../models/Team";
import User from "./../../../models/User";

connectDB();

export default async function teamPage(req, res) {
  if (req.method === "POST") {
    const { selectedTeam, user, teamCode } = req.body;
    try {
      const teamSchema = await Team.findOne({ teamName: selectedTeam });
      const userSchema = await User.findOne({ username: user });
      if (teamSchema.teamCode === teamCode) {
        if (userSchema.team) {
          const currentTeam = await Team.findOne({ teamName: userSchema.team });
          await Team.updateMany(
            { members: user },
            { $pull: { members: user } },
          );
          if (currentTeam) {
            currentTeam.members = currentTeam.members.filter(
              (name) => name !== user,
            );
            await currentTeam.save();
          }
        }
        teamSchema.members = [...teamSchema.members, user];
        await teamSchema.save();

        userSchema.team = selectedTeam;
        await userSchema.save();
        res.status(200).json({ success: "Bruker lagt til team" });
      } else {
        res.status(400).json({ error: "Feil teamkode" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
  if (req.method === "DELETE") {
    try {
      const user = req.body;
      const userSchema = await User.findOne({ username: user.user });
      const teamSchema = await Team.findOne({ teamName: userSchema.team });
      teamSchema.members = teamSchema.members.filter((name) => name !== user);
      userSchema.team = "";
      await userSchema.save();
      await teamSchema.save();
      res.status(200).json({ success: "Bruker fjernet fra team" });
    } catch (e) {
      res.status(400).json({ error: "Feil ved sletting av bruker", e });
    }
  }
  if (req.method === "GET") {
    try {
      console.log("Henter brukere");
      const teams = await Team.find({});
      res.status(200).json({ teams });
    } catch (error) {
      res.status(508).json({
        error: "Det oppstod en feil ved henting av brukere.",
      });
      console.log(error);
    }
  }
}
