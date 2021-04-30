export { ajaxFunc }


let ajaxFunc = {
    addToGame: function (sendData) {
        return $.ajax({
            url: '/add/',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
        })
    },
    comebackToGame: function (sendData) {
        return $.ajax({
            url: '/check/',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",

        })
    },

    updateGame: function (sendData) {
        return $.ajax({
            url: '/update/',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
        })
    },

    check: function (sendData) {
        return $.ajax({
            url: '/check/',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown)
            },
        })
    },


    updateBoard: function (sendData) {
        return $.ajax({
            url: '/game/',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown)
            },
        })
    },

    beat: function (sendData) {
        return $.ajax({
            url: '/beat/',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown)
            },
        })
    }

}