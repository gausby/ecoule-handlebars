Handlebars Template support for Écoule
======================================
An [Écoule][ecoule-core] [Handlebars][handlebars] template instance that fetches templates, partials, and helpers from various sources and output an object with ready to use handlebars instances.

[ecoule-core]: https://github.com/gausby/ecoule

It can easily be used as an helper in an Écoule transformer.

**Caveat**: When Handlebars registre a partial, helper, or template is does so on the same Handlebars instance. It will overwrite previous set partials, helpers or templates if two or more share the same name. We need to sandbox Handlebars instances if more than one transformer is going to use handlebars in an Écoule instance.

This project uses the [Handlebars][handlebars] template engine made by [Yehuda Katz][wycats] and others. This project is not condoned or supported by any of the Handlebars creators. Please do not bug them with bugs related to this project. Instead use the [Handlebars for Écoule issue tracker][project-issue-tracker] if you find bugs in this software.

[wycats]: https://github.com/wycats
[handlebars]: http://handlebarsjs.com
[project-issue-tracker]: https://github.com/gausby/ecoule-handlebars/issues


## Usage
Attach it as an helper to an Écoule data transformer. You can specify which sources of templates, partials and helpers. The following example uses the [Écoule Transformer Mock][ecoule-transformer-mock], and the [Écoule file-system source][ecoule-file-system-source]--which needs to be installed using NPM--to fetch partials from a folder on the local file system:

    var Ecoule = require('ecoule'),
        ecouleHandlebars = require('ecoule-handlebars'),
        fileSystemSource = require('ecoule-source-file-system'),
        mockTransformer = require('ecoule-transformer-mock'),
        path = require('path')
    ;

    var myTemplates = ecouleHandlebars({
        sources: [
            // use as many sources as you need
            fileSystemSource({
                title: 'example source',
                // create a templates folder in the script dir
                // and put files with `.handlebars` as the file
                // extension into it.
                pattern: path.join(__dirname, 'templates/**')
            })
        ]
    });

    var myEcouleInstance = new Ecoule({
        transformers: [
            mockTransformer({
                'helpers': { templates: myTemplates },
                // in this example we pass an execute function to
                // the mock transformer to show that the output
                // of ecouleHandlebars has been assigned to the
                // parent transformer on the key `templates`.
                'execute': function (done) {
                    console.log(this.templates);
                    done();
                }
            })
        ]
    });

    myEcouleInstance.refresh();

This configuration will make the output of the Ecoule Handlebars instance available to the mock transformer on the defined `templates`-variable. Within the parent transformer it is accessible through `this.templates`.

[ecoule-transformer-mock]: https://github.com/gausby/ecoule-transformer-mock
[ecoule-file-system-source]: https://github.com/gausby/ecoule-source-file-system


### Supported Écoule input sources
By default this package handles files from the [file system source][ecoule-file-system-source] and direct input, it should be easy to add support for more sources in by adding more data handlers in the Handlebars for Écoule configuration.

  * *File system source*, every file that has the file extension `.handlebars` or `js` within the configured glob pattern will be handled.
    * Files ending in `.handlebars` will be treated as template files.
    * Files ending in `.partials.handlebars` will be treated as partials
    * Files einding in `.js` will be required in and registred as helper functions. Remember to use `module.exports` to expose your handlebars helper.

  * Direct input. See the unit test file for an example of this method.

[ecoule-file-system-source]: https://github.com/gausby/ecoule-source-file-system

## Development
After cloning the project you will have to run `npm install` in the project root. This will install the various grunt plugins and other dependencies.


### QA tools
The QA tools rely on the [Grunt](http://gruntjs.com) task runner. To run any of these tools, you will need the grunt-cli installed globally on your system. This is easily done by typing the following in a terminal.

    $ npm install grunt-cli -g

The unit tests will need the [Buster](http://busterjs.org/) unit test framework.

    $ npm install -g buster

These two commands will install the buster and grunt commands on your system. These can be removed by typing `npm uninstall buster -g` and `npm uninstall grunt-cli -g`.


### Unit Tests
If you haven't all ready install the Grunt CLI tools and have a look at the grunt configuration file in the root of the project.

When developing you want to run the script watcher. Navigate to the project root and type the following in your terminal.

    $ grunt watch:scripts

This will run the jshint and tests each time a file has been modified.


## License
The MIT License (MIT)

Copyright (c) 2013 Martin Gausby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
