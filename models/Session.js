import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: String,
  food: Number,
  sleep: Number,
  motivation: Number,
  phyisical: Number,
  psychological: Number,
  played: Number,
  comment: String,
});

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
