const mongoose = require("mongoose")

const Schema = mongoose.Schema

const screeningSchema = new mongoose.Schema({
  film: { type: Schema.Types.ObjectId, ref: "Movie" },
  event_id: { type: String, unique: true },
  startTime: String,
  endTime: String,
  ticketType: { type: String, enum: ["regular", "premium", "press"] },
  auditorium: { type: Schema.Types.ObjectId, ref: "Auditorium" },
  ticketsLeft: {
    type: Number,
    validate: [
      function (value) {
        return value >= 0
      },
    ],
  },
})

// screeningSchema.index({ film: 1, startTime: 1, venue: 1 }, { unique: true })

module.exports = mongoose.model("Screening", screeningSchema)
