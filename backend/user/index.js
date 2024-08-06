const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
require('dotenv').config()


const router = express.Router()

var bodyParser = require("body-parser")
var jsonParser = bodyParser.json()

const { ManagementClient } = require("auth0")

const newManagement = () => {
  return new ManagementClient({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
  });
}

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
const connect = require("../db")
var jsonParser = bodyParser.json()

router.post("/initialize", jsonParser, async (req, res) => {
  // var management = new ManagementClient({
  //   domain: "dev-b7whenpwkzhxw431.us.auth0.com",
  //   clientId: "DxSXwsY3NJASppL6NkLA2Rl9vlak8oyx",
  //   clientSecret: "MgB4W_HclnCx_iKmGOYh4lDK2y1BpqX-fo2h-etvEaQZRa7JieyFHkGgUZHtrU3w",
  // })
  // let user = await management.users.update(
  //   { id: req.body.id },
  //   { user_metadata: { schedule: [], friends: [] } }
  // )

  connect()
  var result = await User.insertMany([{ email: req.body.email, schedule: [], friends: [] }], {
    ordered: false,
  })
  return res.json(result)
})

// Get Mongo User by their email
router.post("/findMongo", jsonParser, async (req, res) => {
  connect()
  var result = await User.findOne({ email: req.body.email })
  return res.json(result)
})

router.post("/schedule2", jsonParser, async (req, res) => {
  connect()
  var result = await User.findOneAndUpdate(
    { email: req.body.email },
    { schedule: req.body.schedule }
  )
  return res.json(result)
})

router.post("/friends2", jsonParser, async (req, res) => {
  connect()
  var result = await User.findOneAndUpdate(
    { email: req.body.email },
    { schedule: req.body.friends }
  )
  return res.json(result)
})

// UPDATE the user's schedule. NOT add or delete, that has to be done on the client side. You get what you get.
// If you want to GET the user's schedule it will have to come as part of the user object.
router.post("/schedule", jsonParser, async (req, res) => {
  let params = req.body
  var management = new ManagementClient({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
  })

  let user = await management.users.update(
    { id: req.body.id },
    { user_metadata: { schedule: req.body.schedule } }
  )
  console.log("Post-update", user)
  return res.json(user)
})

// UPDATE the user's friends – same situation as above.
router.post("/friends", async (req, res) => {
  let params = req.body
  var management = new ManagementClient({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
  })

  let user = await management.users.update(
    { id: req.body.id },
    { user_metadata: { friends: req.body.friends } }
  )
})

// Return the schedule of an arbitrary user.
router.get("/schedule/:id", (req, res) => {
  let auth0id = req.params.id
  User.findOne({ auth0id: auth0id }, (err, userProfile) => {
    if (err || !userProfile) return res.status(500).send(err)
    return res.json(userProfile.schedule)
  })
})

// Find all users with the given parameters
router.get("/all", async (req, res) => {
  let params = req.body
  var management = new ManagementClient({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
  })
  let result = await management.users.getAll()
  return res.json(result)
})

// Find user by their email
router.post("/", jsonParser, async (req, res) => {
  var management = new ManagementClient({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
  })
  let result = {}
  if (req.body.email) {
    console.log(req.body.email)
    let result = await management.usersByEmail.getByEmail({ email: req.body.email })
    return res.send(result.data)
  } else if (req.body.id) {
    console.log(req.body.id)
    let result = await management.users
      .get({ id: req.body.id })
      .then((r) => {
        console.log(r.data)
        return r.data
      })
      .catch((err) => {
        console.log(err)
      })
    return res.send(result.data)
  }
  return res.json({})
})

module.exports = router
