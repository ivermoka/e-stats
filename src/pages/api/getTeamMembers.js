import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const user = req.query.user;
        const userSchema = await User.findOne({username: user})
        const userTeam = userSchema.team;

        const users = await User.find({
            'team': {$in: [userTeam]}
        });
        try {
            res.status(200).json({users, userTeam});
        } catch (error) {
            res.status(500).json({
                error: "Det oppstod en feil ved henting av brukere.",
            });
        }
    }
}
