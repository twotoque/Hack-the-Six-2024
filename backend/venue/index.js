const express = require("express")
const mongoose = require("mongoose")
const Venue = require("../models/venue")
const Auditorium = require("../models/auditorium")
const connect = require("../db")

const router = express.Router()

var bodyParser = require("body-parser")
var jsonParser = bodyParser.json()

// Find venues given fields specified in request body (must be JSON)
router.post("/", jsonParser, async (req, res) => {
  connect()
  var results = await Venue.find(req.body)
  return res.json(results)
})

// Query with venue slug in the body for all the audits in that venue.
router.post("/auditoriums", jsonParser, async (req, res) => {
  connect()
  if (req.body.venue) {
    let venue = await Venue.findOne({ slug: req.body.venue })
    let id = venue._id
    let results = await Auditorium.find({ venue: id })
    return res.json(results)
  } else {
    let results = await Auditorium.find({})
    return res.json(results)
  }
})

// Fills the database with the venues and auditoriums from the TIFF site. Doesn't really need to be run unless tables are dropped.
const collectVenueData = require("./utils")
const PRODUCTION = require("..")
router.get("/add/default", async (req, res) => {
  if (!PRODUCTION) {
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
