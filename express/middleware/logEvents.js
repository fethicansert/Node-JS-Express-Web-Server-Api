const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { format } = require('date-fns');
const { v4:uuid } = require('uuid');

const writeLog = async (message, fileName) => {

    const logDirectory = path.join(__dirname, '..', 'logs');
    const logFile = path.join(logDirectory, fileName);
    const dateTime = format(new Date(), 'yyyy/MM/dd-HH:mm:ss');
    const logMessage = `log_id: ${uuid()} log_time: ${dateTime} log_message: ${message}\n`;

    try{
        if(!fs.existsSync(logDirectory)){
            await fsPromises.mkdir(logDirectory);
        } 
        await fsPromises.appendFile(logFile, logMessage);
    } catch(err){
        console.error(err)
    }
}

const logger = (req, res, next) => {
    // console.log(`${req.method} ${req.path}`);
    writeLog(`${req.method} ${req.headers.origin} ${req.url}`, 'requestLogs.txt');
    next();
}


module.exports = { writeLog, logger}