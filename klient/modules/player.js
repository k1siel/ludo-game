
export default class Player {
    constructor(username, status, lastActivity) {
        this.username = username
        this.time = new Date().getTime()
        this.lastActivity = lastActivity
        this.status = status
        this.color = "none"
        this.gameId = "none"
    }

    get data(){
        return this.createJson()
    }

    createJson(){
        let ob = {
            username: this.username,
            time: this.time,
            lastActivity: this.lastActivity,
            status: this.status,
            color: this.color,
            gameId: this.gameId
        }

        return ob
    }
}

//statusy użytkowników
//0 - wszedł do gry
//1 - gotów do gry (min. 2 graczy by rozpocząć, wszyscy obecni gotowi)
//2 - oczekuję na swój ruch
//3 - ruch tego gracza (kolejno: czerwony, niebieski, zielony, żółty)
//4 - afk