Meteor.startup(function() {
  var fs = Npm.require('fs'), 
      path = Npm.require('path'), 
      base = path.resolve('.'), 
      Mocha = Npm.require(base + '/tests/node_modules/mocha'), 
      reporter = Npm.require(base + '/tests/node_modules/mocha/lib/reporters/spec');
  Proxy = Npm.require(base + '/tests/node_modules/phantom-proxy');

  Mocha.reporters.Base.useColors = true;
  var mocha = new Mocha({
    reporter: 'spec'
  });

  fs.readdirSync(base + '/tests/').filter(function(file) {
    return file.substr(-3) === '.js';
  }).forEach(function(file){
    mocha.addFile(
      path.join('tests/', file)
    );
  });

  process.stdout.write('Starting Mocha test session…');
  mocha.run(function(failures) {
    process.kill('SIGTERM');
  });
});