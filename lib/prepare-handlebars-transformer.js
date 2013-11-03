/* global module require */
'use strict';

var handlebars = require('handlebars');

function Transformer (config) {
    this.queries = config.queries || {};
    this.preprocessors = config.preprocessors || [];
    this.postprocessors = config.postprocessors || [];
    this.outputs = config.outputs || [];
    this.handlebars = handlebars;
}

Transformer.prototype.initialize = function (done) {
    return done();
};

Transformer.prototype.execute = function (done) {
    var templates = {};

    // add helpers
    for (var helper in this.data.helpers) {
        helper = this.data.helpers[helper];

        if (typeof helper.fn === 'function') {
            this.handlebars.registerHelper(
                helper.name,
                helper.fn
            );
        }
    }

    // add partials
    for (var partial in this.data.partials) {
        partial = this.data.partials[partial];

        this.handlebars.registerPartial(
            partial.name,
            this.handlebars.compile(partial.source)
        );
    }

    // compile templates
    for (var template in this.data.templates) {
        template = this.data.templates[template];
        templates[template.name] = this.handlebars.compile(template.source);
    }

    return done(undefined, templates);
};

module.exports = function (config) {
    return new Transformer(config || {});
};