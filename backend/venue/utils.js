const fs = require("fs")
const Venue = require("../models/venue")
const Auditorium = require("../models/auditorium")

const collectVenueData = () => {
  return new Promise(function (resolve, reject) {
    fs.readFile("static/venues-2023.txt", (err, data) => {
      if (!err) {
        resolve(JSON.parse(data.toString()))
      } else {
        reject(err)
      }
    })
  })
}

exports.collectVenueData = collectVenueData
exports.getAllVenues = async () => {
  return await Venue.find({})
}

exports.getAllAuditoriums = async () => {
  return await Auditorium.find({})
}
