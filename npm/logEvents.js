const { format, longFormatters }  = require('date-fns');
const { v4: uuid } = require('uuid');


const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logTime = `${dateTime}\t${uuid()}\t${message}\n`
    const logFile = path.join(__dirname, 'logs');

    try {
        if(!fs.existsSync(logFile)){
            await fsPromises.mkdir(logFile);
            console.log("Logs File Created");
        } 
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'event_logs.txt'),logTime);
        console.log(`Logs File Created:\t${logTime}`);
    } catch(err) {
        console.error(err)
    }
}

module.exports = logEvents;