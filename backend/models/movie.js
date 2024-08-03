const mongoose = require("mongoose")

const Schema = mongoose.Schema

const movieSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  runtime: Number,
  programmes: [String],
  genres: [String],
  description: [String],
  director: String,
  countries: String,
  languages: String,
  poster: String,
  header: String,
})

module.exports = mongoose.model("Movie", movieSchema)
