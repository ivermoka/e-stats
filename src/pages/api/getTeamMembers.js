import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const user = req.query.user;
        const UserSchema = User.findOne({ user: user })
        const userTeam = UserSchema.team;

        const users = await User.find({
            'team': { $in: [userTeam] }
        });
        try {
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({
                error: "Det oppstod en feil ved henting av brukere.",
            });
        }
    }
}
