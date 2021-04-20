
let ludo = {
    getRandomColor:function (el) {
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
}

module.exports = ludo