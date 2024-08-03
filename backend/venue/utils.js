const fs = require("fs")

const collectVenueData = () => {
  return new Promise(function (resolve, reject) {
    fs.readFile("static/venues-2023.txt", (err, data) => {
      if (!err) {
        resolve(JSON.parse(data.toString()))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = collectVenueData
