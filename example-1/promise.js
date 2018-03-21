const customFile = require('../customModules/custom-file');

function execute(generator, value) {
    const next = generator.next(value);

    if(!next.done) {
        next.value.then(
            result => execute(generator, result),
            err => generator.throw(err)
        );
    }
    else {
        console.log('Finish!');
        process.exit();
    }
};

const gen1 = function * () {
    const list = yield customFile.read('./files/file-list.dat'); // yields promise, after recursive gen1 call .next(result) -> list = result

    const fileNames = list.split('\r\n').map(name => name.trim()).filter(name => !!name);

    // 1-st option [consistently asynchronously read files wtf??? but true]
    // read async first file, then second, then third etc.
    /*
    let sum = 0;
    const num1 = yield customFile.read('./files/'+fileNames[0]);
    const num2 = yield customFile.read('./files/'+fileNames[1]);
    const num3 = yield customFile.read('./files/'+fileNames[2]);

    sum +=+ num1;
    sum +=+ num2;
    sum +=+ num3;
    */

    // 2-nd [consistently asynchronously read files wtf??? but true]
    /*
    let sum = 0;
    for(let fileName of fileNames) {
        const num = yield customFile.read('./files/'+fileName);
        sum +=+ num;
    }
    */

    // 3-rd [parallel asynchronously read files wtf??? but true]
    const numbers = yield Promise.all(
        fileNames.map(fileName => customFile.read('./files/'+fileName))
    );
    const sum = numbers.reduce((sum, num) => +num + +sum);

    yield customFile.write('./files/out-promise.dat', `result is ${sum}`);
};

execute(gen1());