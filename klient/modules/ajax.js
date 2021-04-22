export { ajaxFunc }


let ajaxFunc = {
    addToGame: function (sendData) {
        return $.ajax({
            url: 'http://localhost:3000/add',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
        })
    },
    comebackToGame: function (sendData) {
        return $.ajax({
            url: 'http://localhost:3000/check',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",

        })
    },

    updateGame: function (sendData) {
        return $.ajax({
            url: 'http://localhost:3000/update',
            type: 'POST',
            data: sendData,
            dataType: "json",
            responseType: "json",
        })
    }

}