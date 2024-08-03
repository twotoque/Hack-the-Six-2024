const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  console.log("Reached screening/")
  return res.json({ screening: "fgrkjhkr" })
})

module.exports = router
