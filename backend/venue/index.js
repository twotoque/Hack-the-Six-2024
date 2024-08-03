const express = require("express")
const mongoose = require("mongoose")

const router = express.Router()

router.get("/test", (req, res) => {
  console.log("Reached venue/test - will attempt to add a sample venue")

  return res.json({ screening: "fgrkjhkr" })
})

module.exports = router
