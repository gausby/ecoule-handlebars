/* global module require Buffer*/
'use strict';

var keyValueCopy = require('ecoule-data-handler-key-value-copy');

function toString(input) {
    return input.toString();
}

function compile(source) {
    /* jshint evil: true */
    return new Function('context', 'options', source);
}


module.exports.template = keyValueCopy({
    match: {
        type: { equals: 'template' },
        name: { typeOf: 'string' },
        source: [
            { typeOf: 'string' },
            { typeOf: 'function' }
        ],
        fn: { typeOf: 'undefined' }
    },
    directives: [
        { from: 'source', to: 'source', fn: toString }
    ]
});

module.exports.partial = keyValueCopy({
    match: {
        type: { equals: 'partial' },
        name: { typeOf: 'string' },
        source: [
            { typeOf: 'string' },
            { typeOf: 'function' }
        ],
        fn: { typeOf: 'undefined' }
    },
    directives: [
        { from: 'source', to: 'source', fn: toString }
    ]
});

module.exports.helper = keyValueCopy({
    match: {
        type: { equals: 'helper' },
        name: { typeOf: 'string' },
        source: { typeOf: 'string' },
        fn: { typeOf: 'undefined' }
    },
    directives: { from: 'source', to: 'fn', fn: compile }
});
