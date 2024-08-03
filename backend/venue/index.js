const express = require("express")
const mongoose = require("mongoose")
const Venue = require("../models/venue")
const connect = require("../db")

const router = express.Router()

router.get("/test", async (req, res) => {
  connect()
  console.log("Reached venue/test - will attempt to add a sample venue")
  let findVenue = Venue.findOne({ slug: "tiff-lightbox" }).then((result, err) => {
    console.log("Error", err)
    console.log("Result", result)
    if (result) {
      console.log("Could not add.")
      return res.json({ message: "We found a venue with this slug already in the db. Not adding" })
    } else {
      const newVenue = new Venue({
        name: "TIFF Lightbox",
        slug: "tiff-lightbox",
        address: "350 King St W, Toronto",
        description:
          "A good movie theatre downtown specializing in massively overpriced and underpriced tickets.",
      })
      newVenue.save()
      console.log("Added successfully")
      return res.json({ message: "Added theatre" })
    }
  })
})

const collectVenueData = require("./utils")

router.get("/add/default", async (req, res) => {
  connect()
  venueData = await collectVenueData()
  let venues = []
  for (key in venueData) {
    venues.push({ name: key, slug: venueData[key]["slug"], address: venueData[key]["address"] })
  }
  // let result = await Venue.insertMany(venues)
  let result = await Venue.insertMany([venues[0]])
  return res.json(result)
})

module.exports = router
