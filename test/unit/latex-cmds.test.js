suite('latex cmds', function() {
  var LatexCmds, processedCmds;
  setup(function() {
    var mathField = MQ.MathField($('<span></span>').appendTo('#mock')[0]);
    LatexCmds = mathField.__controller.LatexCmds;
    processedCmds = [];
  });

  function assertValidCtrlSeq(ctrlSeq) {
    assert.ok(
      !/^\\.*[A-Za-z]$/.test(ctrlSeq),
      ctrlSeq + ' is a valid control sequence'
    );
  }

  test('validating LatexCmds control sequences', function() {
    for (var key in LatexCmds) {
      if (LatexCmds.hasOwnProperty(key)) {
        var cmd = LatexCmds[key];
        // LatexCmds includes aliases of items whose ctrlSeq properties might be the same.
        // We don't want to waste time processing something twice.
        if (!processedCmds.includes(cmd.ctrlSeq)) {
          processedCmds.push(cmd.ctrlSeq);
          assertValidCtrlSeq(cmd.ctrlSeq);
        }
      }
    }
  });

});
