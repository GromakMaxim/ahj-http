const fs = require("fs");

class SimpleFileReader {
    constructor() {

    }

    async read() {
        console.log('inside read method')
        let content = JSON.parse(fs.readFileSync("db.txt", "utf8"));
        console.log('read this: ' + content);
        return content;
    }
}

module.exports = SimpleFileReader;
