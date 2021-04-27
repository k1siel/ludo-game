export default class Board {
    constructor(boardArray) {
        boardArray = this.boardArray

      //  redPlace = [0,0,0,0]
      //  bluePlace = [0,0,0,0]
      //  greenPlace = [0,0,0,0]
      //  yellowPlace = [0,0,0,0]


    }

    createBoard() {
        let div = document.getElementById("board")

        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                let block = document.createElement("div")
                block.classList.add("bloczek")
                block.classList.add("X" + i)
                block.classList.add("Y" + j)
                div.appendChild(block)
            }
        }
    }

    rollDice() {
        let num = Math.floor(Math.random() * (7 - 1)) + 1;
        console.log(num)
        document.getElementById("dice").style.backgroundImage = 'url("./modules/images/' + num + 'dice.svg")'

        return num
    }
}