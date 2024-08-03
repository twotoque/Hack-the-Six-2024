const express = require("express")
const router = express.Router()

const Movie = require("../models/movie")

var bodyParser = require("body-parser")
const connect = require("../db")
const { getAllMovies } = require("./utils")
var jsonParser = bodyParser.json()

router.get("/", jsonParser, async (req, res) => {
  connect()
  var results = await getAllMovies(req.body)
  return res.json(results)
})

module.exports = router
