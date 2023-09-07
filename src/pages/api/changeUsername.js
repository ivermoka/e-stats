import connectDB from "./../../../db";

connectDB();

export default async function changeUsername(req, res) {
  const { newUsername } = req.body;

  try {
  } catch (error) {
    console.error("Error while changing username:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
}
