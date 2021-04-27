"use strict";
import Player from "./player.js"
import { ajaxFunc } from "./ajax.js"
import Board from "./board.js"

let board = new Board()
let player = "empty"
window.addEventListener('DOMContentLoaded', (event) => {

    start.load()
    board.createBoard()
});




let start = {
    load: async function () {
        console.log()
        if (sessionStorage.getItem("gameId") != null) {
            console.log(sessionStorage)
            let ob = {
                username: sessionStorage.getItem("username"),
                gameId: sessionStorage.getItem("gameId")
            }
            let user = await ajaxFunc.comebackToGame(ob)
            console.log(user)
            console.log(user.username, user.color)
            player = new Player(user.username, "0", new Date().getTime())
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
        gameUpdate.update()
        gameUpdate.interval = setInterval(gameUpdate.update, 3000)
        document.getElementById("play").addEventListener("click", gameUpdate.changeStatus)
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
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].color == player.color) {
                player.status = userData[i].status
            }
        }
        if (player.status == 3) {

            document.getElementById("roll").style.display = "inherit"
            document.getElementById("roll").addEventListener("click", gameUpdate.roll)
        }
    },

    roll: function () {
        let num = board.rollDice()

        document.getElementById("roll").onclick = null
        document.getElementById("roll").style.display = "none"
        ajaxFunc.updateBoard(player.data)

        let move = board.moveExist(num, player.color)

        if (move) {


            let bloczki = document.getElementsByClassName("bloczek")
            console.log("you can move")
            for (let i = 0; i < bloczki.length; i++) {
                bloczki[i].addEventListener("click", gameUpdate.movePawn)
            }

        }
        else {
            player.status = 4
        }
    },

    movePawn() {
        if (this.style.backgroundImage != "") {
            let bg = this.style.backgroundImage

            if (bg.includes(player.color)) {
                console.log("you moved!")
                player.status = 4
            }
        }
        //if(this.style.backgroundImage )
    }
}


