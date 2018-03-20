"use strict";
const fs = require('fs');

exports.read = function (file) {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function(err, text) {
            if(err) {
                return reject(err);
            }
            resolve(text);
        });
    });
};

exports.write = function (file, source) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(file, source, 'utf8', function(err) {
            if(err) {
                return reject(err);
            }
            resolve();
        });
    });
};