const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

async function connect() {
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

module.exports = connect
