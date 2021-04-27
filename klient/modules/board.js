export default class Board {
    constructor() {

        this.redPlace = [0, 0, 0, 0]
        this.bluePlace = [0, 0, 0, 0]
        this.greenPlace = [0, 0, 0, 0]
        this.yellowPlace = [0, 0, 0, 0]
        this.redFirstPlaces = [
            [1, 1],
            [2, 1],
            [1, 2],
            [2, 2]
        ]
        this.blueFirstPlaces = [
            [1, 10],
            [1, 11],
            [2, 10],
            [2, 11]
        ]
        this.greenFirstPlaces = [
            [10, 1],
            [10, 2],
            [11, 1],
            [11, 2]
        ]
        this.yellowFirstPlaces = [
            [10, 10],
            [10, 11],
            [11, 10],
            [11, 11]
        ]

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

    putPawns() {
        let put = function (pawns, color) {
            for (let i = 0; i < pawns.length; i++) {
                let divek = document.getElementsByClassName("X" + pawns[i][0] + " Y" + pawns[i][1])
                divek[0].style.backgroundImage = 'url("./modules/images/' + color + '.svg")'
            }
        }
        put(this.redFirstPlaces, "red")
        put(this.blueFirstPlaces, "blue")
        put(this.greenFirstPlaces, "green")
        put(this.yellowFirstPlaces, "yellow")
    }

    moveExist(num, color) {
        let arr;
        let move = false;
        if (color == "red") {
            arr = this.redPlace
        }
        else if (color == "blue") {
            arr = this.bluePlace
        }
        else if (color == "green") {
            arr = this.greenPlace
        }
        else if (color == "yellow") {
            arr = this.yellowPlace
        }

        arr.forEach(element => {
            if (element != 0) {
                move = true
            }


            if (num == 6 || num == 0) {
                if (element == 0) {
                    move = true
                }
            }
        });


        return move
    }
}