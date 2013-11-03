/* global module */
'use strict';

/* source =================================================== */
function Source (config) {
    this.title = config.title || 'Untitled source';
    this.data = config.data || [];
}

Source.prototype.refresh = function(done) {
    return done(undefined, this.data);
};

module.exports = function (config) {
    return new Source(config || {});
};
