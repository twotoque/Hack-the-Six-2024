const express = require("express")
const mongoose = require("mongoose")
const { auth } = require("express-oauth2-jwt-bearer")

const app = express()
const port = preocess.env.PORT || 3000

const authConfig = {
  audience: "YOUR_API_IDENTIFIER",
  issuerBaseURL: "https://YOUR_AUTH0_DOMAIN/",
}

mongoose
  .connect(
    "mongodb+srv://willgotlib:hackthe6ix2024@cluster0.jb3p4ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

const movieSchema = new mongoose.Schema({
  title: String,
  slug: String,
  runtime: Number,
  programmes: [String],
  genres: [String],
  description: [String],
  director: String,
  countries: String,
  languages: String,
  poster: URL,
  header: URL,
})

const Movie = mongoose.model("Movie", movieSchema)

const venueSchema = new mongoose.Schema({
  name: String, // i.e. "TIFF Lightbox"
  address: String, // i.e. "350 King St W, Toronto"
  description: String, // i.e. "A good movie theatre downtown specializing in X and Y."
})

const Venue = mongoose.model("Venue", venueSchema)

const auditoriumSchema = new mongoose.Schema({
  venue: Venue, // i.e. TIFF Lightbox entry describes above
  name: String, // i.e. "TIFF Lightbox 2"
  capacity: { type: Number, min: 0 },
})

const Auditorium = mongoose.model("Auditorium", auditoriumSchema)

const screeningSchema = new mongoose.Schema({
  film: Movie,
  id: String,
  startTime: String,
  endTime: String,
  ticketType: { type: String, enum: ["regular", "premium", "press"] },
  venue: Auditorium,
  ticketsLeft: {
    type: Number,
    validate: [
      function (value) {
        return value >= 0 && value <= this.venue.capacity
      },
    ],
  },
})

const userSchema = new mongoose.Schema({
  auth0id: String,
  email: String,
  password: String,
  schedule: [Screening],
  friends: [String], // Other users' emails?
})

const User = mongoose.model("User", userSchema)

app.use(auth(authConfig))

app.get("/profile", (req, res) => {
  const user = req.user
  User.findOne({ auth0Id: user.sub }, (err, userProfile) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
