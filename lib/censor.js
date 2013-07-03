#! /usr/bin/env node

/*
 * Censor
 * https://github.com/sixFingers/censor
 *
 * Copyright (c) 2013 Ignazio Setti
 * Licensed under the MIT license.
 */

'use strict';

// Filesystem and path utilities
var fs = require('fs'), 
    path = require('path');

// We use Node’s Child Process library, 
// more specifically the exec module, 
// which runs a shell command and buffers the output.
var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    path = require('path'),
    base = path.resolve('../lib/inject'),
    meteor, mocha;

// Check if this is a valid Meteor folder
var isMeteor = fs.existsSync("./.meteor") && fs.lstatSync('./.meteor').isDirectory();

if(isMeteor) {
  rejectLibrary();
  injectLibrary();
  runTestSession();
} else {
  console.log('Not a valid Meteor project.');
  process.exit();
}

function injectLibrary() {
  // var inject = exec('ln -fs ./tests/node_modules/censor-inject.js ./.');
  var inject = exec('ln -fs /usr/local/lib/node_modules/censor/lib/inject.js ./.');
}

function rejectLibrary() {
  var injected = fs.existsSync('./inject.js');
  if(injected) exec('rm -f ./inject.js');
}

function runTestSession() {
  console.log('Go Censor!');
  meteor = spawn('meteor');
  meteor.stdout.on('data', function(data) {
    process.stdout.write(data);
  });

  process.on('SIGTERM', function() {
    process.exit();
  });
}

/*======================================
=            Process Events            =
======================================*/

process.on('SIGINT', function() {
  rejectLibrary();
  console.log('\nCensor aborted. Closing Meteor session.')
});

process.on('exit', function() {
  rejectLibrary();
  console.log('\nCensor exit.');
});
