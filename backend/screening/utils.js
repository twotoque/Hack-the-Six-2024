const fs = require("fs")

const collectScreeningData = () => {
  return new Promise(function (resolve, reject) {
    fs.readFile("static/old_data.txt", (err, data) => {
      if (!err) {
        resolve(JSON.parse(data.toString()))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = collectScreeningData
