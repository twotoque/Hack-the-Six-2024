const express = require("express")
const mongoose = require("mongoose")
const Venue = require("../models/venue")
const Auditorium = require("../models/auditorium")
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
const PRODUCTION = require("..")

router.get("/add/default", async (req, res) => {
  if (PRODUCTION) {
    return res.json({ Message: "This endpoint is restricted during production." })
  }
  connect()
  venueData = await collectVenueData()
  let venues = []
  let auditoriums = []
  for (key in venueData) {
    venues.push({ name: key, slug: venueData[key]["slug"], address: venueData[key]["address"] })
    for (aud of venueData[key]["auditoriums"]) {
      auditoriums.push({
        venue: venueData[key]["slug"],
        name: aud["name"],
        slug: aud["slug"],
        capacity: aud["capacity"],
      })
    }
  }
  // let result = await Venue.insertMany(venues)
  let full_res = { venues: {}, auditoriums: {} }
  try {
    let result = await Venue.insertMany(venues, { ordered: false })
    console.log(result)
    full_res["venues"] = result
  } catch (error) {
    // There's definitely a way to make this better but it should work so why bother
    // console.log(error)
    // return res.json()
  }

  console.log(auditoriums)
  let ids = {}
  for (aud of auditoriums) {
    try {
      if (!(aud["venue"] in ids)) {
        let test = await Venue.findOne({ slug: aud["venue"] }).exec()
        if (!test) {
          return res.json("Something went wrong - db didnt have a venue it should have")
        }
        // Theatre in DB...it really should be
        ids[aud["venue"]] = test._id
      }
      // console.log(ids[aud["venue"]])
      let result = await Auditorium.create({
        venue: ids[aud["venue"]],
        name: aud["name"],
        slug: aud["slug"],
        capacity: aud["capacity"],
      })
    } catch {}
  }

  return res.json(full_res)
})

module.exports = router
