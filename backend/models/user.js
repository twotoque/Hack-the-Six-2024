const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  auth0id: String,
  email: String,
  password: String,
  schedule: [{ type: Schema.Types.ObjectId, ref: "Screening" }],
  friends: [String], // Other users' emails?
})

module.exports = mongoose.model("User", userSchema)
