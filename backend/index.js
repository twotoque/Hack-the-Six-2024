const { auth } = require("express-openid-connect")
const express = require("express")

const app = express()

const authConfig = {
  auth0Logout: true,
  secret: "6ijXxBYDhbK6m0pljN8GCbxTx2BQEtqst6XL84zkvkbnJ7h2q5Uf1RwlJJ_6AZxi",
  issuerBaseURL: "https://dev-0oanh27cotux4lfn.us.auth0.com",
  clientID: "BNuiJNoPzOg6Z0asnKphqPHQonRZ9yPp",
  baseURL: "http://localhost:3008",
}

app.use(auth(authConfig))

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out")
})

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
const { toBeRequired } = require("@testing-library/jest-dom/matchers")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3008

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

module.exports = PRODUCTION
