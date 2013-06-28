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
var spawn = require('child_process').spawn, 
    meteor;

// Check if this is a valid Meteor folder
var isMeteor = fs.existsSync("./.meteor") && fs.lstatSync('./.meteor').isDirectory();

if(isMeteor) {
  runTestSession();
} else {
  console.log('Not a valid Meteor project.');
  process.exit();
}

function runTestSession() {
  console.log('Go Censor!');
  meteor = spawn('meteor');
  meteor.stdout.on('data', function(data) {
    console.log(data.toString());
  });
  // , function(err, stdout, stderr) {
  //   if(err !== null) {
  //     console.log('err');
  //     throw(err);
  //   }
  //   console.log(stdout);
  // });
}

/*======================================
=            Process Events            =
======================================*/

process.on('SIGINT', function() {
  console.log('\nCensor aborted. Closing Meteor session.')
});



// process.exit();