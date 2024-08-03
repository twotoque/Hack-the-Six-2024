const express = require("express")
const mongoose = require("mongoose")
const { auth } = require("express-oauth2-jwt-bearer")
const User = require("../models/user")
const connect = require("../db")

const router = express.Router()

const authConfig = {
  // audience: "http://localhost:3000", //
  audience: "https://tifftok.com/login", // TODO: Probably need to change this?
  issuerBaseURL: "dev-nr6w2ef4fy5je1rv.ca.auth0.com/",
}

// router.use(auth(authConfig))

router.get("/login", (req, res) => {
  connect()
  const currentUser = req.user
  User.findOne({ auth0Id: currentUser.sub }, (err, userProfile) => {
    if (err) return res.status(500).send(err)
    if (!userProfile) {
      // create new user profile in MongoDB
      const newUser = new User({
        auth0Id: currentUser.sub,
        email: currentUser.email,
        password: currentUser.password,
      })
      newUser.save((err, savedUser) => {
        if (err) return res.status(500).send(err)
        res.json(savedUser)
      })
    } else {
      res.json(userProfile)
    }
  })
})

router.get("/schedule", (req, res) => {
  const user = req.user
  if (!user) {
    return res.redirect("/login")
  }
  User.findOne({ auth0id: user.sub }, (err, userProfile) => {
    if (err) return res.status(500).send(err)
    // Assuming at this point that we're logged in
    return res.json(userProfile.schedule)
  })
})

var bodyParser = require("body-parser")
var jsonParser = bodyParser.json()

// TODO: Make this add a screening to a user's schedule...also make a complementary one to delete
router.post("/schedule", jsonParser, (req, res) => {})
router.delete("/schedule", jsonParser, (req, res) => {})

// TODO: Get all this user's friends (redir to login if needed)
router.get("/friends", (req, res) => {})

// TODO: Should we even be able to look at any other user's friends?

// TODO: Add a friend, remove a friend
router.post("/friends", (req, res) => {})
router.delete("/friends", (req, res) => {})

// Return the schedule of an arbitrary user.
router.get("/schedule/:id", (req, res) => {
  let auth0id = req.params.id
  User.findOne({ auth0id: auth0id }, (err, userProfile) => {
    if (err || !userProfile) return res.status(500).send(err)
    return res.json(userProfile.schedule)
  })
})

router.get("/all", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err)
    return res.json(users)
  })
})

router.get("/", (req, res) => {
  console.log("Reached user/")
  return res.json({ req: req })
})

module.exports = router
