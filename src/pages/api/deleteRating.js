import connectDB from "../../../db";
import Egenvurdering from "../../../models/EgenvurderingModel";

connectDB().then();

export default async function deleteUser(req, res) {
  const { user, date } = req.body;

  try {
    const egenvurdering = await Egenvurdering.findOne({
      user: user,
      date: date,
    });
    if (!egenvurdering) {
      return res.status(400).json({ status: "Rating not found" });
    }
    console.log(egenvurdering);
    await egenvurdering.deleteOne();
    return res.status(200).json({ status: "Rating successfully deleted." });
  } catch (error) {
    console.error("Error while deleting rating:", error);
    res.status(400).json({ status: "Internal Server Error" });
  }
}