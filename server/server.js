const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const port = 3000
const db = require(__dirname + "/database-controler.js")
app.use(bodyParser.urlencoded({ extended: true }));

let lastgame = ""
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../klient', 'index.html'))
})

getRandomColor = function (el) {
  let colors = ["red", "blue", "green", "yellow"]

  if (el.length != 0) {
    for (let i = 0; i < el.length; i++) {
      let color = el[i].color
      let index = colors.indexOf(color)
      colors.splice(index, 1)
    }

    let random = Math.floor(Math.random() * colors.length)
    let randomColor = colors[random]

    return randomColor
  }
  else {
    let random = Math.floor(Math.random() * colors.length)
    let randomColor = colors[random]

    return randomColor
  }
}


app.post("/add", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body)
  console.log(lastgame)
  let playerData = req.body
  if (lastgame == "") {
    lastgame = new Date().getTime()
    playerData.gameId = String(lastgame)
    playerData.color = getRandomColor("")
    db.addUser(playerData)
    res.end(JSON.stringify(playerData))
    console.log(playerData)
  }
  else {

    let check = async function () {
      let users = await db.getUsers(lastgame)
      console.log(users.length)
      if (users.length < 4) {
        playerData.gameId = String(lastgame)
        playerData.color = getRandomColor(users)
        db.addUser(playerData)
        res.end(JSON.stringify(playerData))
        console.log(playerData)
      }
      else {
        lastgame = new Date().getTime()
        playerData.gameId = String(lastgame)
        db.addUser(playerData)
        playerData.color = getRandomColor("")
        res.end(JSON.stringify(playerData))
        console.log(playerData)
      }
    }
    check()

  }



})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})