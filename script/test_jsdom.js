var child_process = require('child_process');
var jsdom = require('jsdom');


var serverProc = child_process.spawn('node', ['script/test_server.js']);
serverProc.stdout.on('data', function(data) {
  if (data.indexOf('listening on') >= 0) {
    console.log('' + data);
    run();
  }
});

function run() {
  console.log("creating JSDOM instance");
  var uri = 'http://localhost:9292/test/unit.html';
  // Creating a virtual console to keep the main Node process window uncluttered with MathQuill script output.
  var virtualConsole = new jsdom.VirtualConsole();
  var jsdomOptions = {
    virtualConsole: virtualConsole,
    runScripts: 'dangerously',
    resources: "usable",
    pretendToBeVisual: true
  };
  jsdom.JSDOM.fromURL(uri, jsdomOptions).then(function (dom) {
    console.log("running unit tests");
    dom.window.jsdomDone = done;
  }).catch (function (e) {
      console.log(e);
  });
}

function done(mochaResults) {
  console.log("Completed in", (mochaResults.duration / 1000), "s.");
  console.log("Tests:", mochaResults.tests);
  console.log("Passes:", mochaResults.passes);
  console.log("Failures:", mochaResults.failures);
  console.log("Pending:", mochaResults.pending);
  serverProc.kill();
  process.exit();
}
