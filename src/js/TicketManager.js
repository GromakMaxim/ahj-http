const XMLHttpRequest = require('xhr2');

const baseUrl = 'https://getpantry.cloud/apiv1/pantry/';
const secretId = 'b1e0fafb-3b18-406b-8929-417a8064e301';

class TicketManager {

    constructor() {

    }

    async getAllTickets() {
        let ids = [];
        await this.getIds()
            .then(
                result => result.forEach((item) => ids.push(parseInt(item.name))),
                error => {
                    ids = null;
                    console.log(error);
                }
            )

        ids.sort((v1, v2) => v1 - v2);

        let tasks = [];

        for (let id of ids) {
            await this.getTaskById(id)
                .then(
                    result => tasks.push(result),
                    error => {
                        tasks = null;
                        console.log(error);
                    }
                )
        }
        return tasks;
    }

    getIds() {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) resolve(JSON.parse(this.responseText).baskets);
            });

            xhr.open("GET", baseUrl + secretId);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send()
        });
    }

    getTaskById(id) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) resolve(JSON.parse(this.responseText));
            });

            xhr.open("GET", baseUrl + secretId + '/basket/' + id);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send()
        })
    }

    async createTask(body) {

        console.log(body)

        let ids = [];
        await this.getIds()
            .then(
                result => result.forEach((item) => ids.push(parseInt(item.name))),
                error => {
                    ids = null;
                    console.log(error);
                }
            )

        const foundId = ids.filter((id) => {
            return id === parseInt(body.id);
        });

        let idToSave = body.id;
        let response;

        if (foundId.length === 0) {
            response = {
                "savedId": body.id,
                "type": "new",
                "savedContent": body,
            }
        } else {
            response = {
                "savedId": idToSave,
                "type": "edited",
                "savedContent": body,
            }
        }

        body = JSON.stringify(body);
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) resolve(response);
            });

            xhr.open("POST", baseUrl + secretId + '/basket/' + idToSave);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(body)
        });
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
