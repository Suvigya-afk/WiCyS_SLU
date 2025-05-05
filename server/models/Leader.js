// models/Leader.js
import mongoose from "mongoose";

const LeaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: Number, required: true },
  picture: { type: String },
  isCurrent: { type: Boolean, default: false },
});

const Leader = mongoose.model("Leader", LeaderSchema);
export default Leader;
