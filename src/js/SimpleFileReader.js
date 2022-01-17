const fs = require("fs");

class SimpleFileReader {
    constructor() {

    }
    read() {
        return new Promise((resolve, reject)=>{
            fs.readFile("db.txt", "utf8",
                function (error, data) {
                    if (error) throw new Error('file db.txt is not available');
                    resolve(JSON.parse(data));
                });
        });
    }
}

module.exports = SimpleFileReader;
