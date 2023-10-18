import mongoose from "mongoose";

const teamModel = new mongoose.Schema({
  teamName: { type: String, unique: true },
  members: { type: Array, default: [] },
  requests: { type: Array, default: [] },
});

const Team = mongoose.model("Teams", teamModel) || mongoose.model("Teams");

export default Team;
