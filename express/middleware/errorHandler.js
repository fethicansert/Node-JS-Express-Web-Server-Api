const { writeLog } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    console.log(err);
    console.error(err.stack);
    writeLog(`${err.name} ${err.message}`, 'errorLog.txt');
    res.status(500).send(err.message);
    next();
}

module.exports = errorHandler;