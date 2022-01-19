const fs = require("fs");

class SimpleFileWriter {
    constructor() {

    }

    async write(content) {
        fs.writeFileSync("db.txt", content);

    }
}

module.exports = SimpleFileWriter;
