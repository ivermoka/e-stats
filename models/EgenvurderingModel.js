import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  disclosure1: Number,
  disclosure2: Number,
  disclosure3: Number,
  disclosure4: Number,
  disclosure5: Number,
  disclosure6: Number,
  comment: String,
  date: String,
  user: String,
  team: String,
  school: String,
  hasRatedPart2: Boolean,
  adminRated: { type: Boolean, default: false },
});

const Egenvurdering =
  mongoose.models.Egenvurdering || mongoose.model("Egenvurdering", userSchema);

export default Egenvurdering;
