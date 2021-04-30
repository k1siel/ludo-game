
let ludo = {
  getRandomColor: function (el) {
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
  },

  addFirst: function (users) {
    let firstColor = "red"
    let userWithColor = ""

    for (let i = 0; i < users.length; i++) {
      users[i].status = 2
    }

    let nextColor = function (actual) {
      let next = ""
      if (actual == "red") {
        next = "blue"
      }
      else if (actual == "blue") {
        next = "green"
      }
      else if (actual == "green") {
        next = "yellow"
      }
      else if (actual == "yellow") {
        next = "red"
      }

      return next
    }

    let next = firstColor

    while (userWithColor == "") {
      console.log(next)
      for (let i = 0; i < users.length; i++) {
        if (users[i].color == next) {
          userWithColor = users[i]

          users[i].status = 3
        }
      }

      let pom = nextColor(next)
      next = pom
    }

    return users
  },



  nextPlayer: function (users, actualUser) {
    let next = ""
    for (let i = 0; i < users.length; i++) {
      if (users[i].color == actualUser.color) {
        users[i].status = 2
        console.log("status changed", users[i])
      }
    }
    let nextColor = function (actual) {
      let next = ""
      if (actual == "red") {
        next = "blue"
      }
      else if (actual == "blue") {
        next = "green"
      }
      else if (actual == "green") {
        next = "yellow"
      }
      else if (actual == "yellow") {
        next = "red"
      }

      return next
    }

    next = nextColor(actualUser.color)
    let userWithColor = ""
    console.log(next)
    while (userWithColor == "") {
      console.log(next)
      for (let i = 0; i < users.length; i++) {
        if (users[i].color == next) {
          if (users[i].status != 8 ) {
            userWithColor = users[i]

            users[i].status = 3
          }
        }
      }

      let pom = nextColor(next)
      next = pom

    }

    return userWithColor
  }
}

module.exports = ludo