import connectDB from "./../../../db";
import User from "./../../../models/User";

connectDB();

export default async function handler(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({ status: "Not able to find the user" });
  } else {
    res.redirect("/");
  }
}
