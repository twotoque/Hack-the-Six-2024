const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

async function connect() {
  console.log("Connecting to mongo...")
  await mongoose
    .connect(
      "mongodb+srv://willgotlib:hackthe6ix2024@cluster0.jb3p4ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("Caught an error!")
      console.error("MongoDB connection error:", err)
    })
  console.log("Finished mongo connection establishment")
}

module.exports = connect
