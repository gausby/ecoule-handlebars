/*jslint maxlen:140*/
/* global require process __dirname */
'use strict';

/* this test suit is far from done. */

var buster = require('buster'),
    path = require('path'),

    ecouleHandlebars = require('../lib/ecoule-handlebars'),
    fileSystemSource = require('ecoule-source-file-system'),

    output = require('ecoule-output-object-reference'),
    mockSource = require('./mocks/source')
;

var assert = buster.referee.assert;
var refute = buster.referee.refute;


buster.testCase('Handlebars', {
    '//should load partials': function (done) {

    },
    '//should load helpers': function (done) {
    },

    'should be able to initialize': function (done) {
        var templates = {};
        var sources = [
            fileSystemSource({
                title: 'file system input',
                pattern: path.join(__dirname, '/sandbox/**')
            }),

            mockSource({
                title: 'direct input',
                data: [
                    {
                        type: 'template',
                        name: 'hest',
                        source: '{{{content}}}{{#list nav}}{{this}}{{/list}}'
                    },
                    {
                        type: 'helper',
                        name: 'lizt',
                        source: [
                            'var ret = "<ul>";',
                            'for(var i=0, j = context.length; i < j; i++)',
                            '{ret = ret + "<li>" + options.fn(context[i])+"</li>";}',
                            'return ret + "</ul>";'
                        ].join('')
                    },
                    { type: 'partial', name:'luv', source: 'I luv U {{name}}' }
                ]
            })
        ];

        var instance = ecouleHandlebars({ sources: sources, result: templates});
        var obj = {
            title: 'Lorem Ipsum',
            content:'<p>This could be markdown output</p>',
            foo: 'Bar',
            nav: ['foo', 'bar', 'baz']
        };

        instance.refresh(function(err) {
            refute.defined(err);

            assert.equals(templates.test(obj), [
                '<h1>Lorem Ipsum<h1>',
                '<p>This is from the file system template</p>',
                '<ol><li>foo</li><li>bar</li><li>baz</li></ol>',
                '',
                '<ul><li>foo</li><li>bar</li><li>baz</li></ul>',
                '<p>Hello this is from the partial, foo is set to "Bar"</p>'
            ].join('\n\n'));

            assert.isTrue(true);
            done();
        });
    }
});
