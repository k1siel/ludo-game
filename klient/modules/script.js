"use strict";
import Player from "./player.js"
import { ajaxFunc } from "./ajax.js"
import Board from "./board.js"
import Pawn from "./pawn.js"
let board = new Board()
let player = "empty"
let num = ""
window.addEventListener('DOMContentLoaded', (event) => {

    start.load()
    board.createBoard()
    console.log(board.greenPlace)
    // document.getElementById("cheat").addEventListener("click", ob.cheat)

});




let synth = window.speechSynthesis;
let voices = [];
function populateVoiceList() {
    voices = synth.getVoices();
    console.log(voices);
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}






let start = {
    load: async function () {
        console.log()
        if (sessionStorage.getItem("gameId")) {
            console.log(sessionStorage)
            let ob = {
                username: sessionStorage.getItem("username"),
                gameId: sessionStorage.getItem("gameId")
            }
            let user = await ajaxFunc.comebackToGame(ob)
            console.log(user)
            console.log(user.username, user.color)
            player = new Player(user.username, user.status, user.time)
            player.color = user.color
            player.gameId = user.gameId
            console.log(player)
        }
        else {

            let nickname = prompt("podaj swój nick!")
            player = new Player(nickname, 0, new Date().getTime())

            let ob = await ajaxFunc.addToGame(player.data)
            sessionStorage.setItem("username", ob.username)
            sessionStorage.setItem("color", ob.color)
            sessionStorage.setItem("gameId", ob.gameId)

            player.color = ob.color
            player.gameId = ob.gameId

            console.log(player)

        }
        if (player.status == 0 || player.status == 1) {
            gameUpdate.update()
            gameUpdate.interval = setInterval(gameUpdate.update, 3000)
            document.getElementById("play").addEventListener("click", gameUpdate.changeStatus)
        }
        else {
            gameUpdate.interval = setInterval(gameUpdate.updateBoard, 3000)
            board.putPawns()


            let userData = await ajaxFunc.updateGame(player.data)

            let players = document.getElementById("players").children


            for (let i = 0; i < userData.length; i++) {
                players[i].innerText = userData[i].username
                if (userData[i].color == "red") {
                    players[i].style.backgroundColor = "#c52f00"
                }
                else if (userData[i].color == "blue") {
                    players[i].style.backgroundColor = "#639cff"
                }
                else if (userData[i].color == "green") {
                    players[i].style.backgroundColor = "#328015"
                }
                else if (userData[i].color == "yellow") {
                    players[i].style.backgroundColor = "#FFFF00"
                }

                if (userData[i].color == player.color) {
                    player.status = userData[i].status
                }
            }
        }
    }


}

let gameUpdate = {
    interval: "",
    update: async function () {
        let userData = await ajaxFunc.updateGame(player.data)
        console.log(userData)
        let players = document.getElementById("players").children


        for (let i = 0; i < userData.length; i++) {
            players[i].innerText = userData[i].username
            if (userData[i].color == "red") {
                players[i].style.backgroundColor = "#c52f00"
            }
            else if (userData[i].color == "blue") {
                players[i].style.backgroundColor = "#639cff"
            }
            else if (userData[i].color == "green") {
                players[i].style.backgroundColor = "#328015"
            }
            else if (userData[i].color == "yellow") {
                players[i].style.backgroundColor = "#FFFF00"
            }

            if (userData[i].color == player.color) {
                player.status = userData[i].status
            }

            if (document.getElementById("play").checked == true) {
                if (player.status == 0) { player.status = 1 }
            }

            if (player.status == 2 || player.status == 3) {
                clearInterval(gameUpdate.interval)
                document.getElementById("play").disabled = true
                await ajaxFunc.updateGame(player.data)
                gameUpdate.interval = setInterval(gameUpdate.updateBoard, 3000)
                board.putPawns()
            }
        }
    },

    changeStatus: function () {
        console.log(player.status)
        if (player.status == "0") {
            player.status = "1"
        }
        else if (player.status == "1") {
            player.status = "0"
        }
    },

    updateBoard: async function () {
        let userData = await ajaxFunc.updateBoard(player.data)
        console.log("ajax2", userData)
        board.updatePawns(userData)
        board.refresh()
        let time;

        for (let i = 0; i < userData.length; i++) {
            if (userData[i].status == 3) {
                time = new Date().getTime()
                time = time - userData[i].lastActivity
                time = Math.floor(time / 1000)
                time = 60 - time
                if (time < 0) {
                    time = 0
                }
                document.getElementById("time").innerHTML = "Tura gracza: " + userData[i].color + "<br> Czas do wykonania ruchu " + time + "s"
            }
            if (userData[i].color == player.color) {
                player.status = userData[i].status
            }
        }
        if (player.status == 3) {
            if (time < 30) {
                player.status = 4
            }
            if (num == "") {
                document.getElementById("roll").style.display = "inherit"
                document.getElementById("roll").addEventListener("click", gameUpdate.roll)
            }
        }
        else if (player.status == 8) {
            document.getElementById("win").innerHTML = "wygranko jest twoje"
        }
        else {
            document.getElementById("roll").style.display = "none"
        }
    },

    roll: function () {
        num = board.rollDice()

        document.getElementById("roll").onclick = null
        document.getElementById("roll").style.display = "none"
        ajaxFunc.updateBoard(player.data)

        let move = board.moveExist(num, player.color)

        function read() {
            var u = new SpeechSynthesisUtterance();
            u.text = num;
            u.voice = voices[100];
            u.pitch = 1;
            u.rate = 1;
            synth.speak(u);
        }

        read(num)

        if (move) {


            let bloczki = document.getElementsByClassName("bloczek")
            console.log("you can move")
            for (let i = 0; i < bloczki.length; i++) {
                bloczki[i].addEventListener("click", gameUpdate.movePawn)
                bloczki[i].addEventListener("mouseover", gameUpdate.over)
                bloczki[i].addEventListener("mouseout", gameUpdate.out)

            }


        }
        else {
            player.status = 4
            num = ""
        }
    },

    movePawn() {
        console.log(this.dataset.position)
        if (typeof (this.dataset.color) != undefined) {
            let pawn = new Pawn(this.dataset.color, this.dataset.index, this.dataset.position)

            if (pawn.color == player.color) {
                console.log("you moved!")
                board.switchingPositions(pawn, num, player)
                player.status = 4
                player.pawns = board.getPlayerPawns(player.color)
                num = ""
                this.dataset.color = ""
                this.dataset.index = ""
                this.dataset.position = ""
                this.style.backgroundImage = "none"
                let bloczki = document.getElementsByClassName("bloczek")
                for (let i = 0; i < bloczki.length; i++) {
                    bloczki[i].removeEventListener("click", gameUpdate.movePawn)
                    bloczki[i].removeEventListener("mouseover", gameUpdate.over)
                    bloczki[i].removeEventListener("mouseout", gameUpdate.out)

                }
                board.refresh()
            }
        }

    },

    over() {
        if (typeof (this.dataset.color) != undefined) {


            if (this.dataset.color == player.color) {
                let pawn = new Pawn(this.dataset.color, this.dataset.index, this.dataset.position)
                if (pawn.position > 0) {
                    console.log("przeszłoooooo")
                    let newPos = Number(pawn.position) + num
                    let X;
                    let Y;
                    if (player.color == "red") {
                        X = board.redCoords[newPos][0]
                        Y = board.redCoords[newPos][1]
                    }
                    else if (player.color == "blue") {
                        X = board.blueCoords[newPos][0]
                        Y = board.blueCoords[newPos][1]
                    }
                    else if (player.color == "green") {
                        X = board.greenCoords[newPos][0]
                        Y = board.greenCoords[newPos][1]
                    }
                    else if (player.color == "yellow") {
                        X = board.yellowCoords[newPos][0]
                        Y = board.yellowCoords[newPos][1]
                    }

                    let divek = document.getElementsByClassName("X" + X + " Y" + Y)
                    divek[0].style.backgroundImage = 'url("./modules/images/hover' + player.color + '.svg")'
                    console.log(divek)
                }
            }
        }
    },

    out() {
        board.refresh()
    }
}

var ob = {
    cheat() {
        player.pawns = [44, 44, 44, 44]
        let fakeData = [
            {
                color: player.color,
                pawns: player.pawns,
            }
        ]

        board.updatePawns(fakeData)
    },

}

