"use strict";
import Player from "./player.js"
import { ajaxFunc } from "./ajax.js"

window.addEventListener('DOMContentLoaded', (event) => {

    start.load()
});




let start = {
    load: function () {
        let nickname = prompt("podaj swój nick!")
        let player = new Player(nickname, 0, new Date().getTime())
        console.log(player, ajaxFunc)

        console.log(player.data)
        ajaxFunc.addToGame(player.data)

    }
}



