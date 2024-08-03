const express = require("express")

const app = express()

// Routes
const userRoutes = require("./user/index.js")
const screeningRoutes = require("./screening/index.js")
const venueRoutes = require("./venue/index.js")
app.use("/user", userRoutes)
app.use("/screening", screeningRoutes)
app.use("/venue", venueRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
