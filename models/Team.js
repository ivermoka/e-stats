import mongoose from "mongoose";

const teamModel = new mongoose.Schema({
  teamName: { type: String, unique: true },
  members: { type: Array, default: [] },
});

const Team = mongoose.models.Team || mongoose.model("Teams", teamModel);

export default Team;
