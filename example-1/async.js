const customFile = require('../customModules/custom-file');

async function work() {
    const list = await customFile.read('./files/file-list.dat');

    const fileNames = list.split('\r\n')
        .map(name => name.trim())
        .filter(name => !!name); // name not empty

    const numbers = await Promise.all(
        fileNames.map(fileName => customFile.read('./files/'+fileName))
    );

    const sum = numbers.reduce((sum, num) => +num + +sum);

    return await customFile.write('./files/out-async.dat', `result is ${sum}`);
};

(async () => {
    await work();
})();