const express = require("express")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const app = express()

// Routes
const userRoutes = require("./user/index.js")
const screeningRoutes = require("./screening/index.js")
app.use("/user", userRoutes)
app.use("/screening", screeningRoutes)

async function main() {
  console.log("grkjrhk")
  await mongoose
    .connect(
      "mongodb+srv://willgotlib:hackthe6ix2024@cluster0.jb3p4ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err))
}

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
