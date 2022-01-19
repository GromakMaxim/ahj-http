const XMLHttpRequest = require('xhr2');
const SimpleFileReader = require('./SimpleFileReader');
const SimpleFileWriter = require('./SimpleFileWriter');

class TicketManager {

    constructor() {
        this.map = new Map();
        this.fillMap();
    }


    async getTaskList() {
        const reader = new SimpleFileReader();
        let content = await reader.read();
        return content;
    }

    async createTask(body) {
        body.id = parseInt(body.id);
        this.map.set(body.id, body);

        let jsonRequest = {
            "tasks": [],
        }

        for (let task of this.map.values()){
            jsonRequest.tasks.push(task);
        }

        return jsonRequest;
    }

    deleteTask(body) {

    }

    async fillMap(){
        const reader = new SimpleFileReader();
        let content = await reader.read();
        let tasks = content.tasks;

        tasks.forEach(task=>{
            this.map.set(task.id, task);
        })
    }
}

module.exports = TicketManager;
