const XMLHttpRequest = require('xhr2');

class DbHandler {
    static baseUrl = 'https://getpantry.cloud/apiv1/pantry/';
    static secretId = 'b1e0fafb-3b18-406b-8929-417a8064e301';

    constructor() {

    }

    async getAllTickets() {
        let ids = [];
        await this.getIds()
            .then(
                result => result.forEach((item) => ids.push(parseInt(item.name))),
                error => ids = null
            )

        ids.sort((v1, v2) => v1 - v2);

        let tasks = [];

        for (let id of ids) {
            await this.getTaskById(id)
                .then(
                    result => tasks.push(result),
                    error => tasks = null
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

            xhr.open("GET", DbHandler.baseUrl + DbHandler.secretId);
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

            xhr.open("GET", DbHandler.baseUrl + DbHandler.secretId + '/basket/' + id);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send()
        })
    }

    async createTask(body) {
        body = JSON.stringify(body);
        // узнать зарегистрированные id
        // найти в них максимальный + 1
        // валидация полей
        // отправить запрос

        console.log('получен post запрос')
        console.log(body)

        let ids = [];
        await this.getIds()
            .then(
                result => result.forEach((item) => ids.push(parseInt(item.name))),
                error => ids = null
            )
        const idToSave = await Math.max.apply(null, ids) + 1;

        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) resolve(true);
            });

            xhr.open("POST", DbHandler.baseUrl + DbHandler.secretId + '/basket/' + idToSave);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(body)
        });
    }
}

module.exports = DbHandler;
