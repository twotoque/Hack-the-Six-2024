const mongoose = require("mongoose")

const Schema = mongoose.Schema

const auditoriumSchema = new mongoose.Schema({
  venue: { type: Schema.Types.ObjectId, ref: "Venue" }, // i.e. TIFF Lightbox entry describes above
  name: String, // i.e. "TIFF Lightbox 2"
  capacity: { type: Number, min: 0 },
})

module.exports = mongoose.model("Auditorium", auditoriumSchema)
