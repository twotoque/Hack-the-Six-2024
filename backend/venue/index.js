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
        title: "TIFF Lightbox",
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

module.exports = router
