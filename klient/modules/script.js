"use strict";
import Player from "./player.js"
import { ajaxFunc } from "./ajax.js"
import Board from "./board.js"

let board = new Board("lol")
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
    }
}


