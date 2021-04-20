const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const port = 3000
const db = require(__dirname + "/database-controler.js")
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const ludo = require(__dirname + "/ludo-functions.js")


const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://ludoGame:zaq1@WSX@ludogame.iy4sg.mongodb.net/ludoGame?retryWrites=true&w=majority', connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })


let lastgame = ""
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../klient', 'index.html'))
})


let userSchema = new mongoose.Schema({
  username: String,
  time: Number,
  lastActivity: Number,
  status: Number,
  color: String,
  gameId: String,
})
let User = mongoose.model("User", userSchema)


app.post("/add", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body)
  console.log(lastgame)
  let playerData = req.body


  if (lastgame == "") {

    lastgame = new Date().getTime()
    playerData.gameId = String(lastgame)
    playerData.color = ludo.getRandomColor("")


    let player = new User(playerData)
    player.save(function (err) {
      if (err) return console.error(err);
      else console.log("saved!")
    })


    res.end(JSON.stringify(playerData))
    console.log(playerData)
  }
  else {

    let check = async function () {
      User.find({gameId: lastgame}, function (err, users) {
        console.log(users)
      

        if (users.length < 4) {
          playerData.gameId = String(lastgame)
          playerData.color = ludo.getRandomColor(users)
         
          let player = new User(playerData)
          player.save(function (err) {
            if (err) return console.error(err);
            else console.log("saved!")
          })
  
          res.end(JSON.stringify(playerData))
          console.log(playerData)
        }
        else {
          lastgame = new Date().getTime()
          playerData.gameId = String(lastgame)
         
  
  
          playerData.color = ludo.getRandomColor("")
          let player = new User(playerData)
          player.save(function (err) {
            if (err) return console.error(err);
            else console.log("saved!")
          })
  
          res.end(JSON.stringify(playerData))
          console.log(playerData)
        }




      })
      
     
    }
    check()

  }



})


app.post("/check", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body)



  let findUser = async function (data) {
    User.find({ username: req.body.username, gameId: req.body.gameId }, function (err, users) {
      console.log(users)
       res.end(JSON.stringify(users[0]))
    })
   // let user = await db.getUser(req.body)
   // res.end(JSON.stringify(user))
   // console.log(user)
  }

  findUser()




})

app.post("/update", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body)

  User.find({gameId: req.body.gameId}, function (err, users) {
    console.log(users)
    res.end(JSON.stringify(users))
  })
  






})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})