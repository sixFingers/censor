# Censor [![Build Status](https://secure.travis-ci.org/sixFingers/censor.png?branch=master)](http://travis-ci.org/sixFingers/censor)

Censor is a command line utility designed to help testing Meteor applications _both_ on the client and the server.

## Getting Started

First of all, you'll need PhantomJS. Censor uses PhantomJS to do client-side testing.
Here we use Homebrew, but you can choose different installation methods (see [PhantomJS download page](http://phantomjs.org/download.html)). 

    brew update && brew install phantomjs 

Inside your application's folder, create a "tests" folder and move into it:
    
    mkdir tests && cd tests

Install locally (in the "tests" folder) [Mocha](https://github.com/visionmedia/mocha) (Censor's internal test suite) and [phantom-proxy](https://github.com/sheebz/phantom-proxy) (needed to access PhantomJS via Node):

    npm install mocha
    npm install phantom-proxy

Finally, install Censor globally (sudo may be required):

    npm install censor -g

## Documentation
Censor works by injecting code into your Meteor folder (it does so by creating a symlink into your project's root folder). The injected file requires Mocha, sets up a PhantomJS session, and prepares *Meteor* and *Proxy* (a proxy to PhantomJS) global variables which become available in your test files. 

### Writing tests
Any file into your /tests folder (which should contain at this point also a node_modules subfolder, but this will be ignored when loading test files) will be loaded and executed. Inside a test file, it's possible to require any external library (for example, Node-included "assert") with a simple:

    var assert = require("assert");
    
Note we are not using _Npm.require_ since inside test files the context is handled straightly by Node.

### Running tests
Move into your application's root folder (Censor won't work if called from a subfolder of an application's root folder) and type:

    censor


## Examples
Test that Meteor and Proxy variables are set and not null:

    var assert = require("assert");

    describe('Censor', function() {
      it('should have both a Meteor and Proxy object', function(done) {
        assert.notEqual(Meteor, null);
        assert.notEqual(Proxy, null);
        done();
      });
    });

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.1 Initial, rough implementation
- 0.1.2 Improved process signaling when exiting

## License
Copyright (c) 2013 Ignazio Setti  
Licensed under the MIT license.