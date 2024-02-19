const { log } = require('node:console');
// const { readFile }  =  require('node:fs/promises');
const { readFile, writeFile, appendFile, rename }  = require('node:fs');
//sometimes / in path can cause problem ex => './files/file.txt' we can use join to eliminate this prbolem
const path = require('path'); 


function renameText(newName) {
    rename(path.join(__dirname,'write.txt'),(__dirname,`${newName}.txt`),(err) => {
        if(err) throw err;
        console.log("Rename Completed");
    });
}

function readText() {
    readFile(path.join(__dirname, 'read.txt'), 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(`Read Completed : ${data.toString()}`);
    })
}
// log("is readfile is ASYNC !")s

function writeText(){
    writeFile(path.join(__dirname, 'write.txt'), 'Hello Heaven', (err) => {
        if (err) throw err;
        log('Write Completed');
    }); 

    appendText();
}

function appendText() {
    appendFile(path.join(__dirname, 'write.txt'), 'Hello Boyzzz', (err) => {
        if (err) throw err;
        console.log("Append Completed");
    })
}


readText();
writeText();
appendText();
renameText('renamed-text');

//Not working well beacuse this functions are asyn but i can't use beuace they are not returning promise



process.on('uncaughtException', err => { //to catch error
    console.error(`Error: ${err}`);
    process.exit(1);
})