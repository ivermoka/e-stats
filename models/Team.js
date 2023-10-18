import mongoose from "mongoose";

const teamModel = new mongoose.Schema({
  teamName: { type: String, unique: true },
  members: { type: Array, default: [] },
  teamCode: { type: String },
});

const Team = mongoose.models.Teams || mongoose.model("Teams", teamModel);

export default Team;
