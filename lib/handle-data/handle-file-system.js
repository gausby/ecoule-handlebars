/* global module require Buffer*/
'use strict';

var keyValueCopy = require('ecoule-data-handler-key-value-copy');

function toString(input) {
    return input.toString();
}

function trim (subject) {
    var search = new RegExp(subject+'$');

    return function(input) {
        return input.replace(search, '');
    };
}

module.exports.template = keyValueCopy({
    match: {
        raw: { instanceOf: Buffer },
        extname: { endsWith: '.handlebars' },
        '!not': { basename: { endsWith: '.partial' } }
    },
    directives: [
        { from: 'raw', to: 'source', fn: toString, overwrite: false },
        { from: 'basename', to: 'name', overwrite: false },
        { write: 'template', to: 'type', overwrite: true }
    ]
});

module.exports.partial = keyValueCopy({
    match: {
        raw: { instanceOf: Buffer },
        extname: { equals: '.handlebars' },
        basename: { endsWith: '.partial' }
    },
    directives: [
        { from: 'raw', to: 'source', fn: toString, overwrite: false },
        { from: 'basename', to: 'name', overwrite: true, fn: trim('.partial') },
        { write: 'partial', to: 'type', overwrite: true }
    ]
});

module.exports.helper = keyValueCopy({
    match: {
        raw: { instanceOf: Buffer },
        extname: { equals: '.js' },
        basename: { endsWith: '.helper' },
        file: { typeOf: 'string' }
    },
    directives: [
        { from: 'file', to: 'fn', fn: require, overwrite: false },
        { from: 'basename', to: 'name', overwrite: true, fn: trim('.helper') },
        { write: 'helper', to: 'type', overwrite: true }
    ]
});
