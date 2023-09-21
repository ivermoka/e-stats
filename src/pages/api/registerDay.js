import Egenvurdering from "../../../models/EgenvurderingModel";
import connectDB from "./../../../db";
import User from "../../../models/User";

connectDB();

export default async (req, res) => {
    if (req.method === "PUT") {
        const {
            disclosure1,
            disclosure2,
            disclosure3,
            disclosure4,
            disclosure5,
            date,
            user,
        } = req.body;
        const userSchema = await User.findOne({username: user});
        const team = userSchema.team;
        try {
            const egenvurdering = new Egenvurdering({
                disclosure1,
                disclosure2,
                disclosure3,
                disclosure4,
                disclosure5,
                date,
                user,
                team,
            });
            await egenvurdering.save();
            res.status(201).json({message: "Egenvurdering registrert."});
        } catch (error) {
            res.status(500).json({
                error: "Det oppstod en feil ved registrering av egenvurdering.",
            });
        }
    }
    if (req.method === "POST") {
        const {
            disclosure6,
            comment,
            date,
            user,
        } = req.body;
        console.log("user: ", user, "date: ", date, "disclosure6: ", disclosure6, "comment: ", comment);
        const egenvurdering = await Egenvurdering.findOne({user: user, date: date});
        try {
            egenvurdering.disclosure6 = disclosure6;
            egenvurdering.comment = comment;
            await egenvurdering.save();
            res.status(201).json({message: "Egenvurdering oppdatert."});
        } catch (error) {
            res.status(500).json({
                error: "Det oppstod en feil ved oppdatering av del 2 av egenvurdering.",

            });
            console.log(error);
        }
    }
};
