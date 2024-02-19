//How Node js Differs from Vanila js
//1-)Node run on server vanilla run on browser
//2-)console not in the browser inspect console in the terminal
//3-)We have global object instead of window object
//4-)Common JS modules(require) instaed of ES6 modules(import)

const math = require('./math');
console.log(math);

// const os = require('os'); //Operating System
// console.log(os.arch()); //return proccesror arm64
// console.log(os.version()); //Returns a string identifying the kernel version. Darwin Kernel Version 23.2.0: Wed Nov 15 21:53:34 PST 2023; root:xnu-10002.61.3~2/RELEASE_ARM64_T8103
// console.log(os.type()); //Returns the operating system name Darwin
// console.log(os.homedir());///Users/fethicansert


// console.log(__dirname);  //Current file parent dir name /Users/fethicansert/Desktop/NodeJS_Beginner
// console.log(__filename); //Current file name /Users/fethicansert/Desktop/NodeJS_Beginner/server.js

const path = require('path');
// console.log(path.basename(__filename)); //it's return base name of given path Desktop/NodeJS_Beginner/server.js => server.js
// console.log(path.dirname(__filename)); //returns direcotry of given filepath
// console.log(path.extname(__filename)); //server.js => .js extension name

console.log(path.parse(__filename)); //create a objectt that hold properties of given path (root, dir, base, ext, name);

