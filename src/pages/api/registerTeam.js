import connectDB from "./../../../db";
import Team from "./../../../models/Team";

connectDB();

export default async function handler(req, res) {
    const teamName = req.body.teamName;
    console.log("teamname: ", teamName)
    try {
        const team = new Team({teamName: teamName});
        await team.save();
        res.status(200).json({"success": "Team created"});
        console.log("Team created");
    } catch (error) {
        res.status(500).json({
            error: "Feil ved oppretting av team",
        });
    }
}
