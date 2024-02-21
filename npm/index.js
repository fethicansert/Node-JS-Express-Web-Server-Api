const logEvents = require('./logEvents');

const EventEmitter = require('events');

//EvenEmiiter imitated the EventListiner
//initialize object
const myEmmitter = new EventEmitter();

//add listiner for the log event
myEmmitter.on('log',(msg) => logEvents(msg)); //create event it's goint to be executed when is triggered with emit

myEmmitter.on('click', (msg) => doSomething()); //Like creating eventListiner =>

const doSomething = () => {
    //Doing Something hahaha :)
    console.log("Doing Something");
}

setTimeout(() => {
    myEmmitter.emit('log', 'Log event emitted');
    // myEmmitter.emit('click'); 
    // console.log(myEmmitter.emit('touch')); //will return false beacuse no touch evetlistiner created
},1000);

// emit is used to trigger an event
// on is used to add a callback function that's going to be executed when the event is triggered

//emitter.on ile listiner ekledigimizi emit ile ise
