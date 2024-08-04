const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  schedule: [{ type: Schema.Types.ObjectId, ref: "Screening" }],
  friends: [String], // Other users' emails?
})

module.exports = mongoose.model("User", userSchema)
