import connectDB from "./../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";
import User from "../../../models/User";

connectDB().then();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const user = req.query.user;
        const date = req.query.date;
        const userSchema = await Egenvurdering.findOne({user: user, date: date});
        if (userSchema === null) {
            res.status(201).send("No egenvurdering found");
        } else {
            res.status(202).json({userSchema});
        }
    }
    if (req.method === "PUT") {
        const {user} = req.body;

        try {
            const userInfo = await User.findOne({username: user});
            console.log(userInfo);
            res.status(200).json(userInfo);
        } catch (error) {
            console.log(error)
        }
    }
}
