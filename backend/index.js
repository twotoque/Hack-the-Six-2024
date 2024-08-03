const auth = require("express-openid-connect")
const express = require("express")

const app = express()

const authConfig = {
  audience: "https://tifftok.com/login",
  issuerBaseURL: "dev-nr6w2ef4fy5je1rv.ca.auth0.com/",
}

router.use(auth(authConfig))

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// When we turn into production mode we want to restrict a few endpoints...
const PRODUCTION = false

// Routes
const userRoutes = require("./user/index.js")
const screeningRoutes = require("./screening/index.js")
const venueRoutes = require("./venue/index.js")
app.use("/user", userRoutes)
app.use("/screening", screeningRoutes)
app.use("/venue", venueRoutes)

const all_routes = require("express-list-endpoints")

app.get("/", (req, res) => {
  console.log()
  return res.json({ message: "Nothing to see here...", data: all_routes(app) })
})

// Body-parser middleware
var bodyParser = require("body-parser")
const { toBeRequired } = require("@testing-library/jest-dom/matchers.js")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

module.exports = PRODUCTION
