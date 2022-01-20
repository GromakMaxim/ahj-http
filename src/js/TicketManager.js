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
        console.log('create task')
        console.log(body)

        body.id = parseInt(body.id);
        this.map.set(body.id, body);

        let jsonRequest = {
            "tasks": [],
        }

        for (let task of this.map.values()){
            jsonRequest.tasks.push(task);
        }

        this.map.delete(null)
        console.log(this.map)
        return jsonRequest;
    }

    async deleteTask(body) {
        body.id = parseInt(body.id);
        this.map.delete(body.id);

        let jsonRequest = {
            "tasks": [],
        }

        this.map.delete(null);

        for (let task of this.map.values()){
            jsonRequest.tasks.push(task);
        }

        return jsonRequest;
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
