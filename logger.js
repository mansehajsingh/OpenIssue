const fs = require("fs");

const logsDirectory = "./logs";

class Logger {

    constructor () {
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory);
        }

        fs.open(logsDirectory + "/errors.log", "w", () => {});
    }

    log (err) {
        const currentDate = new Date();
        fs.writeFile(
            logsDirectory + "/errors.log", 
            `Caught Exception [${currentDate}]: ${err.stack}\r\n\r\n`, 
            { flag: "a+" },
            () => {}
        );
    }

}

module.exports = new Logger();