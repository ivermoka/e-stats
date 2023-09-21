import connectDB from "../../../db";
import User from "../../../models/User";

connectDB().then();

export default async function deleteUser(req, res) {
    const {user} = req.body;

    try {
        const userSchema = await User.findOne({username: user});
        if (!userSchema) {
            return res.status(400).json({status: "User not found"});
        }
        await userSchema.deleteOne();
        return res.status(200).json({status: "User successfully deleted."});
    } catch (error) {
        console.error("Error while deleting user:", error);
        res.status(400).json({status: "Internal Server Error"});
    }
}