//fs stand for filesystem
// const { readFile }  =  require('node:fs/promises');
const { log } = require('node:console');
const { readFile, writeFile, appendFile, rename, unlink }  = require('node:fs/promises');
//sometimes / in path can cause problem ex => './files/file.txt' we can use join to eliminate this prbolem
const path = require('path'); 

//Reading File
const readText = async () => {
    try {
        const content = await readFile(path.join(__dirname, 'read.txt'), { encoding: 'utf-8' });
        console.log('Read Completed');
        return content;
    } catch(err) {
        console.error(err);
    }
}

//Writing to File
const writeText = async () => {
    try {
        const x = await writeFile(path.join(__dirname,'write.txt'),'Hello Broskii');
        console.log('Write Completed');
    } catch(err) {
        console.error(err);
    }
}

//Appending to File
const appendText = async () => {
    try {
        await appendFile(path.join(__dirname,'write.txt'),'appended Textzz');
        log("Append Complete");
    } catch(err) {
        console.error(err);
    }
}

//Renaming to File
const renameText = async (name) => {
    try {
        await rename(path.join(__dirname,'write.txt'),path.join(__dirname,'writexx.txt'))
        log("Rename Complete")
    } catch(err) {

    }
}

const deleteText  = async () => {
    try {
        await unlink(path.join(__dirname, 'writexx.txt'));
    } catch(err) {
        console.error(err);
    }
}

const fileSystem  = async () => {
    await readText();
    await writeText();
    await appendText();
    await renameText();
    // await deleteText(); delete file
}

fileSystem();

