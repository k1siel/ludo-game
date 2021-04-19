export {ajaxFunc}


let ajaxFunc ={
    addToGame: function(sendData){
        $.ajax({
            url: 'http://localhost:3000/add',
            type: 'POST',
            data: sendData,
            dataType: "json",
            success: function (response) {
                console.log(response)
           
            },
         
        })
    }

}