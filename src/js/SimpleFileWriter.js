const fs = require("fs");

class SimpleFileWriter {
    constructor() {

    }

    write(content) {
        fs.writeFileSync("db.txt", content);
    }
}

module.exports = SimpleFileWriter;
