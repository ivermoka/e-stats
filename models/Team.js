import mongoose from "mongoose";

const teamModel = new mongoose.Schema({
  teamName: { type: String, unique: true, required: true },
  members: { type: Array, default: [] },
  teamCode: { type: String, required: true },
  school: { type: String },
});

const Team = mongoose.models.Teams || mongoose.model("Teams", teamModel);

export default Team;
