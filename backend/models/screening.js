const mongoose = require("mongoose")

const Schema = mongoose.Schema

const screeningSchema = new mongoose.Schema({
  film: { type: Schema.Types.ObjectId, ref: "Movie" },
  id: String,
  startTime: String,
  endTime: String,
  ticketType: { type: String, enum: ["regular", "premium", "press"] },
  venue: { type: Schema.Types.ObjectId, ref: "Auditorium" },
  ticketsLeft: {
    type: Number,
    validate: [
      function (value) {
        return value >= 0 && value <= this.venue.capacity
      },
    ],
  },
})

module.exports = mongoose.model("Screening", screeningSchema)
