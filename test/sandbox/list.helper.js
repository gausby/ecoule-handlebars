/* global module Handlebars */
'use strict';

module.exports = function(items, options) {
    var out = '';
    if (! items) {
        return '';
    }

    for(var i=0, l=items.length; i<l; i++) {
        out += '<li>' + options.fn(items[i]) + '</li>';
    }

    return i !== 0 ? '<ol>' + out + '</ol>' : '';
};