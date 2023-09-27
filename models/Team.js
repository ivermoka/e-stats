import mongoose from "mongoose";

const teamModel = new mongoose.Schema({
    teamName: String,
});

const Team =
    mongoose.models.Egenvurdering || mongoose.model("Teams", teamModel);

export default Team;
