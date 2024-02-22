const { format } = require('date-fns');
const { v4:uuidV4 } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');



const writeLog = async (msg,file) => {
    const logsDirectory = path.join(__dirname, 'logs');
    const logsFile = path.join(__dirname, 'logs', file);
    const dateTime = format(new Date(), 'yyyy/MM/dd-HH:mm:ss');
    const logMessage = `Log id: ${uuidV4()} Log date: ${dateTime} ${msg} \n`;

    if(!fs.existsSync(logsDirectory)){
        await fsPromises.mkdir(logsDirectory)
    } else {
        try {
            await fsPromises.appendFile(logsFile, logMessage);
        } catch(err) {
            console.error(err)
        }
    }

} 

module.exports = writeLog;