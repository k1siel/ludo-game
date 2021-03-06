const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000
//const db = require(__dirname + "/database-controler.js")
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const ludo = require(__dirname + "/server/ludo-functions.js")
const path = require('path')

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}
mongoose.connect('mongodb+srv://ludoGame:zaq1@WSX@ludogame.iy4sg.mongodb.net/ludoGame?retryWrites=true&w=majority', connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })


let lastgame = ""
app.use(express.static(path.join(__dirname, "/klient")))


let userSchema = new mongoose.Schema({
  username: String,
  time: Number,
  lastActivity: Number,
  status: Number,
  color: String,
  gameId: String,
  pawns: Array,
})
let User = mongoose.model("User", userSchema)


app.post("/add", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Content-Type", "application/json");
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
      User.find({ gameId: lastgame }, function (err, users) {
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Content-Type", "application/json");
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

app.post("/update", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Content-Type", "application/json");
  console.log(req.body)


  let filter = { gameId: req.body.gameId, username: req.body.username, time: req.body.time }
  let update = { status: req.body.status, lastActivity: req.body.lastActivity }
  await User.findOneAndUpdate(filter, update)

  User.find({ gameId: req.body.gameId }, function (err, users) {
    console.log(users)
    let ready = 0
    for (let i = 0; i < users.length; i++) {
      if (users[i].status == 1 || users[i].status == 2 || users[i].status == 3) {
        ready++
      }
    }
    if (users.length == 4) {
      let updated = ludo.addFirst(users)
      users = updated
      lastgame = ""
    }
    else if (ready == users.length && users.length >= 2) {
      let updated = ludo.addFirst(users)
      users = updated
      lastgame = ""
    }
    res.end(JSON.stringify(users))
  })

})

app.post("/game", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Content-Type", "application/json");

  let won = 0
  for (let i = 0; i < 4; i++) {
    if (req.body.pawns[i] == 44) {
      won++
    }
  }


  if (req.body.status == 4) {
    let filter = { gameId: req.body.gameId, username: req.body.username, time: req.body.time }
    let update = { status: 2, lastActivity: req.body.lastActivity, pawns: req.body.pawns }
    await User.findOneAndUpdate(filter, update)


    User.find({ gameId: req.body.gameId }, async function (err, users) {


      let data = new Date().getTime()

      let updated = ludo.nextPlayer(users, req.body)
      filter = { gameId: updated.gameId, username: updated.username, time: updated.time }
      update = { status: 3, lastActivity: data }
      await User.findOneAndUpdate(filter, update)


      User.find({ gameId: req.body.gameId }, function (err, users) {
        res.end(JSON.stringify(users))
 
      });


    });
  }
  else {
    if (won == 4) {
      let filter = { gameId: req.body.gameId, username: req.body.username, time: req.body.time }
      let update = { status: 8, lastActivity: req.body.lastActivity, pawns: req.body.pawns }
      await User.findOneAndUpdate(filter, update)
    }


    User.find({ gameId: req.body.gameId }, function (err, users) {




      res.end(JSON.stringify(users))



    });


  }
})

app.post("/beat", async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Content-Type", "application/json");

  console.log("beat", req.body)
  let col = req.body.color
  let iddd = req.body.gameId

  User.findOne({ gameId: req.body.gameId, color: req.body.color }, async function (err, user) {
    let array = user.pawns

    array[req.body.index - 1] = 0
    console.log("user", user)

    let filter = { gameId: iddd, color: col }
    let update = { pawns: array }
    await User.findOneAndUpdate(filter, update)

    res.end()

  });

})






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})