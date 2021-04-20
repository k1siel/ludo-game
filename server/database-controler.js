var Datastore = require('nedb')

let database = new Datastore({
    filename: 'data.db',
    autoload: true
});


let dbFunc = {

    addUser: function (doc) {
    
        database.insert(doc, function (err, newDoc) {
            console.log("added")
        });


    },



    readRecords: function () {
        let songs = { songs: [], }
        let promise = new Promise((resolve, reject) => {
            database.find({}, function (err, docs) {
                docs.forEach(element => {
                    let ob = { file: element.song }
                    songs.songs.push(ob)
                });
                resolve(songs)
            });
        })
            .then(value => {
                console.log(value)
                return value
            })


        return promise
    },

    getUser(el) {
        let promise = new Promise((resolve, reject) => {
            database.findOne(el, function (err, docs) {
                console.log(docs)
                let record = JSON.stringify(docs)
                resolve(record)
            })
        })

        return promise
    },

    getUsers: function (id) {
        console.log(id)
        let promise = new Promise((resolve, reject) => {
            database.find({ gameId: String(id) }, function (err, docs) {
               
                let record = docs
                resolve(record)
            })
        })

        return promise
    }

}

module.exports = dbFunc