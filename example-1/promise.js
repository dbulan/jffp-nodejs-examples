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
    let sum = 0;

    const num1 = yield customFile.read('./files/'+fileNames[0]);
    const num2 = yield customFile.read('./files/'+fileNames[1]);
    const num3 = yield customFile.read('./files/'+fileNames[2]);

    sum +=+ num1;
    sum +=+ num2;
    sum +=+ num3;

    yield customFile.write('./files/out-promise.dat', `result is ${sum}`);
};

execute(gen1());