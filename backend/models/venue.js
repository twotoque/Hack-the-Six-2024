const mongoose = require("mongoose")

const Schema = mongoose.Schema

const venueSchema = new mongoose.Schema({
  name: String, // i.e. "TIFF Lightbox"
  slug: { type: String, unique: true }, // i.e. "tiff-lightbox"
  address: String, // i.e. "350 King St W, Toronto"
  description: { type: String, default: "A Movie Theatre in Downtown Toronto." }, // i.e. "A good movie theatre downtown specializing in X and Y."
})

module.exports = mongoose.model("Venue", venueSchema)
