export default class Board {
    constructor(boardArray) {
        boardArray = this.boardArray
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
}