var child_process = require('child_process');
var puppeteer = require('puppeteer');


async function launchServer() {
  console.log("starting test server");
  let serverProc = child_process.spawn('node', ['script/test_server.js']);
  serverProc.stdout.on('data', function(data) {
    if (data.indexOf('listening on') >= 0) {
      console.log('' + data);
    }
  });
  return serverProc;
}

function runTests() {
  puppeteer.launch().then(async browser => {
    const serverProc = await launchServer();
    const page = await browser.newPage();
    await page.goto('http://localhost:9292/test/unit.html');
    const testsAreFinished = () => window.mochaResults !== undefined;
    await page.waitFor(testsAreFinished);
    const mochaResults = await page.evaluate(() => {
      return window.mochaResults;
    });
    page.on('console', msg => console.log(msg.text()));
    console.log("Completed in", (mochaResults.duration / 1000), "s.");
    console.log("Tests:", mochaResults.tests);
    console.log("Passes:", mochaResults.passes);
    console.log("Failures:", mochaResults.failures);
    console.log("Pending:", mochaResults.pending);
    await browser.close();
    serverProc.kill();
  });
}

runTests();
