'use strict';

class Animal {
    constructor(name) {
        this._name = name;
    }

    set Name(value) { this._name = value; }

    hello() {
        console.log('My animal name is '+this._name);
    }
}

module.exports = Animal;