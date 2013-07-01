Meteor.startup(function() {
  var fs = Npm.require('fs');
  var path = Npm.require('path');
  var base = path.resolve('.');
  var Mocha = Npm.require(base + '/tests/node_modules/mocha');
  var reporter = Npm.require(base + '/tests/node_modules/mocha/lib/reporters/spec');
  Mocha.reporters.Base.useColors = true;
  var mocha = new Mocha({
    reporter: 'spec'
  });
  
  Proxy = Npm.require(base + '/tests/node_modules/phantom-proxy');
  
  var files = fs.readdirSync(base + '/tests/');
  files.splice(files.indexOf('node_modules'), 1);
  for(var f = 0; f < files.length; f++ ) {
    files[f] = 'tests/' + files[f];
  }
  mocha.files = files;
  process.stdout.write('Starting Mocha test session…');
  mocha.run(function() {
    process.stdout.write('tests.finish');
  });
});