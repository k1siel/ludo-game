import Pawn from "./pawn.js"

export default class Board {
    constructor() {

        this.redPlace = [new Pawn("red", 1, 0), new Pawn("red", 2, 0), new Pawn("red", 3, 0), new Pawn("red", 4, 0)]
        this.bluePlace = [new Pawn("blue", 1, 0), new Pawn("blue", 2, 0), new Pawn("blue", 3, 0), new Pawn("blue", 4, 0)]
        this.greenPlace = [new Pawn("green", 1, 0), new Pawn("green", 2, 0), new Pawn("green", 3, 0), new Pawn("green", 4, 0)]
        this.yellowPlace = [new Pawn("yellow", 1, 0), new Pawn("yellow", 2, 0), new Pawn("yellow", 3, 0), new Pawn("yellow", 4, 0)]
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

        this.redCoords = [
            [0, 0],
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4],
            [4, 4],
            [4, 5],
            [3, 5],
            [2, 5],
            [1, 5],
            [1, 6],
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [4, 8],
            [5, 8],
            [5, 9],
            [5, 10],
            [5, 11],
            [6, 11],
            [7, 11],
            [7, 10],
            [7, 9],
            [7, 8],
            [8, 8],
            [8, 7],
            [9, 7],
            [10, 7],
            [11, 7],
            [11, 6],
            [11, 5],
            [10, 5],
            [9, 5],
            [8, 5],
            [8, 4],
            [7, 4],
            [7, 3],
            [7, 2],
            [7, 1],
            [6, 1],
            [6, 2],
            [6, 3],
            [6, 4],
            [6, 5],


        ]

        this.blueCoords = [
            [0, 0],

            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [4, 8],
            [5, 8],
            [5, 9],
            [5, 10],
            [5, 11],
            [6, 11],
            [7, 11],
            [7, 10],
            [7, 9],
            [7, 8],
            [8, 8],
            [8, 7],
            [9, 7],
            [10, 7],
            [11, 7],
            [11, 6],
            [11, 5],
            [10, 5],
            [9, 5],
            [8, 5],
            [8, 4],
            [7, 4],
            [7, 3],
            [7, 2],
            [7, 1],
            [6, 1],
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4],
            [4, 4],
            [4, 5],
            [3, 5],
            [2, 5],
            [1, 5],
            [1, 6],
            [2, 6],
            [3, 6],
            [4, 6],
            [5, 6],

        ]

        this.yellowCoords = [
            [0, 0],
            [7, 11],
            [7, 10],
            [7, 9],
            [7, 8],
            [8, 8],
            [8, 7],
            [9, 7],
            [10, 7],
            [11, 7],
            [11, 6],
            [11, 5],
            [10, 5],
            [9, 5],
            [8, 5],
            [8, 4],
            [7, 4],
            [7, 3],
            [7, 2],
            [7, 1],
            [6, 1],
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4],
            [4, 4],
            [4, 5],
            [3, 5],
            [2, 5],
            [1, 5],
            [1, 6],
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [4, 8],
            [5, 8],
            [5, 9],
            [5, 10],
            [5, 11],
            [6, 11],
            [6, 10],
            [6, 9],
            [6, 8],
            [6, 7],

        ]

        this.greenCoords = [

            [0, 0],
            [11, 5],
            [10, 5],
            [9, 5],
            [8, 5],
            [8, 4],
            [7, 4],
            [7, 3],
            [7, 2],
            [7, 1],
            [6, 1],
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4],
            [4, 4],
            [4, 5],
            [3, 5],
            [2, 5],
            [1, 5],
            [1, 6],
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [4, 8],
            [5, 8],
            [5, 9],
            [5, 10],
            [5, 11],
            [6, 11],
            [7, 11],
            [7, 10],
            [7, 9],
            [7, 8],
            [8, 8],
            [8, 7],
            [9, 7],
            [10, 7],
            [11, 7],
            [11, 6],
            [10, 6],
            [9, 6],
            [8, 6],
            [7, 6],
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
        let put = function (pawns, color, places) {
            for (let i = 0; i < pawns.length; i++) {
                let divek = document.getElementsByClassName("X" + pawns[i][0] + " Y" + pawns[i][1])
                divek[0].style.backgroundImage = 'url("./modules/images/' + color + '.svg")'

                divek[0].dataset.color = places[i].color
                divek[0].dataset.index = places[i].index
                divek[0].dataset.position = places[i].position
            }
        }
        put(this.redFirstPlaces, "red", this.redPlace)
        put(this.blueFirstPlaces, "blue", this.bluePlace)
        put(this.greenFirstPlaces, "green", this.greenPlace)
        put(this.yellowFirstPlaces, "yellow", this.yellowPlace)


    }

    getArr(color) {

        let arr;
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

        return arr
    }

    updatePawns(data) {
        for (let i = 0; i < data.length; i++) {

            if (data[i].color == "red") {
                for (let j = 0; j < 4; j++) {
                    this.redPlace[i].position = data[i].pawns[j]
                }
            }
            else if (data[i].color == "blue") {
                for (let j = 0; j < 4; j++) {
                    this.bluePlace[j].position = data[i].pawns[j]
                }
            }
            else if (data[i].color == "green") {
                for (let j = 0; j < 4; j++) {
                    this.greenPlace[j].position = data[i].pawns[j]
                }
            }
            else if (data[i].color == "yellow") {
                for (let j = 0; j < 4; j++) {
                    this.yellowPlace[j].position = data[i].pawns[j]
                }
            }

        }


    }

    refresh() {
        let bloczki = document.getElementsByClassName("bloczek")
        for (let i = 0; i < bloczki.length; i++) {
            bloczki[i].dataset.color = ""
            bloczki[i].dataset.index = ""
            bloczki[i].dataset.position = ""
            bloczki[i].style.backgroundImage = "none"
        }

        let ref = function (arr, color, el) {
            for (let i = 0; i < arr.length; i++) {
                let pawn = arr[i]

                let X;
                let Y;
                if (color == "red") {
                    if (pawn.position == 0) {
                        X = el.redFirstPlaces[pawn.index - 1][0]
                        Y = el.redFirstPlaces[pawn.index - 1][1]
                    }
                    else {
                        X = el.redCoords[pawn.position][0]
                        Y = el.redCoords[pawn.position][1]
                    }
                }
                else if (color == "blue") {
                    if (pawn.position == 0) {
                        X = el.blueFirstPlaces[pawn.index - 1][0]
                        Y = el.blueFirstPlaces[pawn.index - 1][1]
                    }
                    else {
                        X = el.blueCoords[pawn.position][0]
                        Y = el.blueCoords[pawn.position][1]
                    }
                }
                else if (color == "green") {
                    if (pawn.position == 0) {
                        X = el.greenFirstPlaces[pawn.index - 1][0]
                        Y = el.greenFirstPlaces[pawn.index - 1][1]
                    }
                    else {
                        X = el.greenCoords[pawn.position][0]
                        Y = el.greenCoords[pawn.position][1]
                    }
                }
                else if (color == "yellow") {
                    if (pawn.position == 0) {
                        X = el.yellowFirstPlaces[pawn.index - 1][0]
                        Y = el.yellowFirstPlaces[pawn.index - 1][1]
                    }
                    else {
                        X = el.yellowCoords[pawn.position][0]
                        Y = el.yellowCoords[pawn.position][1]
                    }
                }

                let divek = document.getElementsByClassName("X" + X + " Y" + Y)
                divek[0].style.backgroundImage = 'url("./modules/images/' + color + '.svg")'

                divek[0].dataset.color = pawn.color
                divek[0].dataset.index = pawn.index
                divek[0].dataset.position = pawn.position

            }
        }

        ref(this.redPlace, "red", this)
        ref(this.bluePlace, "blue", this)
        ref(this.greenPlace, "green", this)
        ref(this.yellowPlace, "yellow", this)
    }

    getPlayerPawns(color) {
        let arr = this.getArr(color)

        let newArr = []

        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i].position)
        }

        return newArr
    }

    moveExist(num, color) {
        let arr = this.getArr(color)
        let move = false;


        arr.forEach(element => {
            if (element.position != 0) {
                move = true
            }


            if (num == 6 || num == 1) {
                if (element.position == 0) {
                    move = true
                }
            }
        });


        return move
    }

    switchingPositions(pawn, num) {
        console.log(pawn, num)
        if (pawn.color == "red") {
            if (this.redPlace[pawn.index - 1].position == 0) {
                if (num == 1 || num == 6) {
                    this.redPlace[pawn.index - 1].position = 1
                }
            }
            else {

                if ((Number(this.redPlace[pawn.index - 1].position) + Number(num)) > this.redCoords.length - 1) {
                    this.redPlace[pawn.index - 1].position = this.redCoords.length - 1
                } else {
                    this.redPlace[pawn.index - 1].position = Number(this.redPlace[pawn.index - 1].position) + Number(num)
                }
            }
            console.log(this.redPlace)
        }
        else if (pawn.color == "blue") {
            if (this.bluePlace[pawn.index - 1].position == 0) {
                if (num == 1 || num == 6) {
                    this.bluePlace[pawn.index - 1].position = 1
                }
            }
            else {
                if ((Number(this.bluePlace[pawn.index - 1].position) + Number(num)) > this.blueCoords.length - 1) {
                    this.bluePlace[pawn.index - 1].position = this.blueCoords.length - 1
                } else {
                    this.bluePlace[pawn.index - 1].position = Number(this.bluePlace[pawn.index - 1].position) + Number(num)
                }
            }
            console.log(this.bluePlace)
        }
        else if (pawn.color == "green") {

            if (this.greenPlace[pawn.index - 1].position == 0) {
                console.log("przeszlo")
                if (num == 1 || num == 6) {
                    console.log("przeszlo2")
                    this.greenPlace[pawn.index - 1].position = 1
                }
            }
            else {
                if ((Number(this.greenPlace[pawn.index - 1].position) + Number(num)) > this.greenCoords.length - 1) {
                    this.greenPlace[pawn.index - 1].position = this.greenCoords.length - 1
                }
                else {
                    this.greenPlace[pawn.index - 1].position = Number(this.greenPlace[pawn.index - 1].position) + Number(num)
                }
            }
            console.log(this.greenPlace)
        }
        else if (pawn.color == "yellow") {
            if (this.yellowPlace[pawn.index - 1].position == 0) {
                if (num == 1 || num == 6) {
                    this.yellowPlace[pawn.index - 1].position = 1
                }
            }
            else {
                if ((Number(this.yellowPlace[pawn.index - 1].position) + Number(num)) > this.yellowCoords.length - 1) {
                    this.yellowPlace[pawn.index - 1].position = this.yellowCoords.length - 1
                }
                else {
                    this.yellowPlace[pawn.index - 1].position = Number(this.yellowPlace[pawn.index - 1].position) + Number(num)
                }
            }
            console.log(this.yellowPlace)
        }


    }
}