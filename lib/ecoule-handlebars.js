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
    var sources = config.sources || [];

    if (typeof config.handlebarsHelpers === 'object') {
        sources.push({
            title: 'Helpers',
            data: Object.keys(config.handlebarsHelpers).map(function(key) {
                return {
                    type: 'helper',
                    name: key,
                    fn: config.handlebarsHelpers[key]
                }
            }),
            refresh: function (done) {
                return done(undefined, this.data || []);
            }
        });
    }

    return new Ecoule({
        sources: sources,
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
