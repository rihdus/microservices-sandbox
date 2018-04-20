var istanbul = require('istanbul'),
   collector = new istanbul.Collector(),
   reporter = new istanbul.Reporter(),
   instrumenter = new istanbul.Instrumenter(),
   fs = require('fs'),
   path = require('path'),
   sync = false;

const res = instrumenter.instrumentSync(
   fs.readFileSync('./server.js', 'utf8'))

eval(instrumenter.instrumentSync(
   fs.readFileSync('./scripts/test.js', 'utf8'),
   path.join(__dirname, '/test.js')))

collector.add(__coverage__)

reporter.add('text');
reporter.addAll(['lcov', 'clover']);
reporter.write(collector, sync, function () {
   console.log('All reports generated');
});