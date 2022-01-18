const XMLHttpRequest = require('xhr2');
const SimpleFileReader = require('./SimpleFileReader');
const SimpleFileWriter = require('./SimpleFileWriter');

class TicketManager {

    constructor() {

    }

    getTaskList() {
        return new Promise(function (resolve, reject) {
            const reader = new SimpleFileReader();
            resolve(reader.read());
        });
    }

    async createTask(body) {
        console.log('---------------------------------------------------------------------------------')
        const writer = new SimpleFileWriter();
        const reader = new SimpleFileReader();
        const dbContent = await reader.read();

        let jsonRequest = {
            "tasks": [],
        }

        let idFound = false;
        for (let task of dbContent.tasks) {
            if (parseInt(task.id) === parseInt(body.id)) {
                idFound = true;
                task.description = body.description;
                task.shortDescription = body.shortDescription;
                task.creationDate = body.creationDate;
                task.closingDate = body.closingDate;
                task.status = body.status;
                task.isHidden = body.isHidden;
            }
            jsonRequest.tasks.push(task);
        }

        if (!idFound){
            body.id = parseInt(body.id);
            dbContent.tasks.push(body);
        }

        const result = await writer.write(JSON.stringify(dbContent));
        return result;
    }

    deleteTask(body) {
        console.log(body.id)
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) resolve(true);
            });

            xhr.open("DELETE", baseUrl + secretId + '/basket/' + body.id);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send()
        });
    }
}

module.exports = TicketManager;
