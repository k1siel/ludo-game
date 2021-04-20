"use strict";
import Player from "./player.js"
import { ajaxFunc } from "./ajax.js"

window.addEventListener('DOMContentLoaded', (event) => {

    start.load()
});


let player = "empty"

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
            console.log(player)
        }
        else {

            let nickname = prompt("podaj swój nick!")
            player = new Player(nickname, 0, new Date().getTime())

            ajaxFunc.addToGame(player.data)
        }
    }
}

let gameUpdate = {

}


