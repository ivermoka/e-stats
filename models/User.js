import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  dateCreated: { type: Date, default: Date.now },
  team: String,
  school: String,
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
