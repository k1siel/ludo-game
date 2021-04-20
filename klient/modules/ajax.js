export { ajaxFunc }


let ajaxFunc = {
    addToGame: function (sendData) {
        $.ajax({
            url: 'http://localhost:3000/add',
            type: 'POST',
            data: sendData,
            dataType: "json",
            success: function (response) {
                let ob = response
                console.log(response)
                sessionStorage.setItem("username", ob.username)
                sessionStorage.setItem("color", ob.color)
                sessionStorage.setItem("gameId", ob.gameId)
            },

        })
    }

}