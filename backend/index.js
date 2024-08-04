const { auth } = require("express-openid-connect")
const express = require("express")

const app = express()

const port = process.env.PORT || 3001

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: "6ijXxBYDhbK6m0pljN8GCbxTx2BQEtqst6XL84zkvkbnJ7h2q5Uf1RwlJJ_6AZxi",
  baseURL: `http://localhost:${port}`,
  clientID: "DxSXwsY3NJASppL6NkLA2Rl9vlak8oyx",
  issuerBaseURL: "https://dev-b7whenpwkzhxw431.us.auth0.com",
}

app.use(auth(authConfig))

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out")
})

const { requiresAuth } = require("express-openid-connect")

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

// ---------------------------------------------------------------
// GET TOKEN FOR API CALLS (GOOD FOR 24H?)

var axios = require("axios").default

app.get("/client-access", async (req, res) => {
  const axios = require("axios")
  let data = JSON.stringify({
    client_id: "DxSXwsY3NJASppL6NkLA2Rl9vlak8oyx",
    audience: "https://dev-b7whenpwkzhxw431.us.auth0.com/api/v2/",
    scope: ["read:users"],
  })

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://login.auth0.com/api/v2/client-grants",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
  return res.send("em")
})

// ---------------------------------------------------------------

var cors = require("cors")
app.use(cors())

// When we turn into production mode we want to restrict a few endpoints...
const PRODUCTION = false

// Routes
const userRoutes = require("./user/index.js")
const movieRoutes = require("./movie/index.js")
const screeningRoutes = require("./screening/index.js")
const venueRoutes = require("./venue/index.js")
app.use("/user", userRoutes)
app.use("/movie", movieRoutes)
app.use("/screening", screeningRoutes)
app.use("/venue", venueRoutes)

const all_routes = require("express-list-endpoints")

app.get("/", (req, res) => {
  console.log()
  return res.json({ message: "Nothing to see here...", data: all_routes(app) })
})

// Body-parser middleware
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

module.exports = PRODUCTION
