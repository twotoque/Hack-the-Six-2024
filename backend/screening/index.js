const express = require("express")

const router = express.Router()

// TODO: Get all screenings
router.get("/", (req, res) => {
  console.log("Reached screening/")
  return res.json({ screening: "fgrkjhkr" })
})

// TODO: Add or modify a screening. (Not essential bc this data shouldn't need to change...but would be nice)
router.post("/", (req, res) => {})

// TODO: Either book a spot or give one up if they already had one booked...reduce the number of seats left in DB accordingly.
// This is probably unnecessary and doesn't make sense bc you're just expressing interest, not actually buying a ticket by clicking on an event.
router.post("/bookSeat", (req, res) => {})

module.exports = router
