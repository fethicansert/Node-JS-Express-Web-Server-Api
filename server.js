//How Node js Differs from Vanila js
//1-)Node run on server vanilla run on browser
//2-)console not in the browser inspect console in the terminal
//3-)We have global object instead of window object
//4-)Common JS modules(require) instaed of ES6 modules(import)

//Here I used math object to reach function
const math = require('./math');
console.log(math.add(2, 1));
console.log(math.substract(2, 1));
console.log(math.mutlipy(2 ,1));
console.log(math.divide(2 ,1));

//Here I destructured the math module to use the function
const { add, substract, mutlipy, divide } = require('./math'); // returns object that has our functions
console.log(add(2, 1));
console.log(substract(2, 1));
console.log(mutlipy(2, 1));
console.log(divide(2 ,1));

