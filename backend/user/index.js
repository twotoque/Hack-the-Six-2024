const express = require("express")
const mongoose = require("mongoose")
const { auth } = require("express-oauth2-jwt-bearer")
const User = require("../models/user")
const { default: connect } = require("../db")

const router = express.Router()

const authConfig = {
  audience: "https://tifftok.com/login",
  issuerBaseURL: "dev-nr6w2ef4fy5je1rv.ca.auth0.com/",
}

router.use(auth(authConfig))

router.get("/login", (req, res) => {
  connect()
  const user = req.user
  user.findOne({ auth0Id: user.sub }, (err, userProfile) => {
    if (err) return res.status(500).send(err)
    if (!userProfile) {
      // create new user profile in MongoDB
      const newUser = new User({ auth0Id: user.sub, email: user.email, password: user.password })
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
  user.findOne({ auth0Id: user.sub }, (err, userProfile) => {
    if (err) return res.status(500).send(err)
    if (!userProfile) return res.redirect("/login")
    // Assuming at this point that we're logged in
    return res.json(userProfile.schedule)
  })
})

router.get("/", (req, res) => {
  console.log("Reached user/")
  return res.json({ req: req })
})

module.exports = router
