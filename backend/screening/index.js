const express = require("express")
const router = express.Router()

const Screening = require("../models/screening")
const Movie = require("../models/movie")

var bodyParser = require("body-parser")
const connect = require("../db")
var jsonParser = bodyParser.json()

router.post("/", jsonParser, async (req, res) => {
  connect()
  console.log(req.body)
  var results = await getAllScreenings(req.body)
  return res.json(results)
})

const getAllScreenings = async (params = {}) => {
  console.log(params)
  return await Screening.find(params)
}

// TODO: Add or modify a screening. (Not essential bc this data shouldn't need to change...but would be nice)
// Fed an object with screening fields, search by
// router.post("/", jsonParser, async (req, res) => {
//   connect()
//   // Check we have everything
//   if (req.body.slug && req.body.name && req.body.address) {
//   }
//   Screening.findOne({ slug: req.body.slug }).then((res) => console.log(res))
//   await Screening.updateOne({ slug: req.body.slug })
// })

const collectScreeningData = require("./utils")
const PRODUCTION = require("..")
var requestify = require("requestify")

const { getAllVenues, getAllAuditoriums } = require("../venue/utils")
const { getAllMovies } = require("../movie/utils")
const movie = require("../models/movie")

router.get("/add/default", async (req, res) => {
  if (!PRODUCTION) {
    return res.json({ Message: "This endpoint is restricted during production." })
  }
  connect()
  scrData = await collectScreeningData()
  let movies = []
  let screenings = []
  // scrData = scrData.slice(0, 50)
  for (let movie of scrData) {
    if (movie.webProgrammes.includes("Industry Conference, TIFF '23")) continue // Skip industry events...
    var creditsData = { runtime: 90, pitch: "", notes: "" }

    // I think I spammed this too much and it blocked me out
    // await requestify
    //   .get(`https://tiff.net/festivalfilmtemplatejson/${movie.slug}`)
    //   .then(function (res) {
    //     return res.getBody()
    //   })
    //   .then(function (body) {
    //     body = JSON.parse(body)
    //     // Harvest anthing needed from full credits here.
    //     // creditsData.runtime = body.filmCredits.runtime
    //     // creditsData.pitch = body.filmMain.pitch
    //     // creditsData.notes = body.filmMain.notes
    //   })
    //   .catch((error) => {
    //     console.log("CAUGHT AN ERROR WHILE QUERYING TIFF DATA")
    //     console.error(error)
    //   })

    // movies.push({
    //   title: movie.title,
    //   slug: movie.slug,
    //   runtime: creditsData.runtime,
    //   programmes: movie.webProgrammes,
    //   genres: movie.genre,
    //   descriptionShort: movie.description,
    //   descriptionLong: creditsData.notes,
    //   director: movie.d,
    //   countries: movie.countries,
    //   languages: movie.languages,
    //   poster: movie.posterUrl.slice(movie.posterUrl.indexOf("https://")),
    //   header: movie.img.slice(movie.img.indexOf("https://")),
    // })
    movie.scheduleItems.forEach((scr) => {
      screenings.push({
        slug: movie.slug,
        event_id: scr.id,
        startTime: scr.startTime,
        endTime: scr.endTime,
        ticketType: scr.pressAndIndustry
          ? "press"
          : scr.cost.length > 0 && scr.cost[0] == "premiumScreening"
          ? "premium"
          : "regular",
        auditorium: scr.venue.room,
      })
    })
  }
  try {
    // let result1 = await Movie.insertMany(movies, { ordered: false })
  } catch (err) {
    console.error(err)
  }

  var audits = await getAllAuditoriums()
  auditsDict = {}
  for (key in audits) {
    auditsDict[audits[key].name] = audits[key]
  }

  let allMovies = await getAllMovies()
  moviesDict = {}
  for (key in allMovies) {
    moviesDict[allMovies[key].slug] = allMovies[key]
  }

  for (let i = 0; i < screenings.length; i++) {
    if (!moviesDict[screenings[i].slug] || !auditsDict[screenings[i].auditorium]) {
      continue
    }
    let audit = auditsDict[screenings[i].auditorium]
    screenings[i] = { ...screenings[i], film: moviesDict[screenings[i].slug]._id }
    screenings[i]["film"] = moviesDict[screenings[i].slug]._id
    screenings[i].auditorium = audit._id
    screenings[i].ticketsLeft = audit.capacity
  }

  try {
    console.log("ADDING SCREENINGS!", screenings.length)
    let result2 = await Screening.insertMany(screenings)
    return res.json(result2)
  } catch (error) {
    console.error(error)
  }
  return res.json(screenings)
})

// TODO: Either book a spot or give one up if they already had one booked...reduce the number of seats left in DB accordingly.
// This is probably unnecessary and doesn't make sense bc you're just expressing interest, not actually buying a ticket by clicking on an event.
router.post("/bookSeat", (req, res) => {})

module.exports = router
