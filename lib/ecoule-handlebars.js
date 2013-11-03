/* globals require module Buffer */
'use strict';

var Ecoule = require('ecoule'),
    output = require('ecoule-output-object-reference'),
    prepareHandlebars = require('./prepare-handlebars-transformer'),
    // data handlers
    handleFS = require('./handle-data/handle-file-system'),
    directInputHandler = require('./handle-data/handle-direct-input')
;

module.exports = function (config, result) {
    return new Ecoule({
        sources: config.sources || [],
        'data-handlers': [
            handleFS.partial, handleFS.template, handleFS.helper,
            directInputHandler.helper
        ],
        transformers: [
            prepareHandlebars({
                queries: {
                    templates: { type: { equals: 'template' }},
                    helpers: { type: { equals: 'helper' }},
                    partials: { type: { equals: 'partial' }}
                },
                outputs: config.outputs || [ output({ result: config.result }) ]
            })
        ]
    });
};
