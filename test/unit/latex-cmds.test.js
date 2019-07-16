suite('latex cmds', function() {
  var LatexCmds;
  setup(function() {
    var mathField = MQ.MathField($('<span></span>').appendTo('#mock')[0]);
    LatexCmds = mathField.__controller.LatexCmds;
  });

  function assertValidCtrlSeq(ctrlSeq) {
    assert.ok(
      /^\\.*[^A-Za-z]$/.test(ctrlSeq),
      ctrlSeq + ' is a valid control sequence'
    );
  }

  test('validating LatexCmds control sequences', function() {
    for (var key in LatexCmds) {
      if (LatexCmds.hasOwnProperty(key)) {
        var cmd = LatexCmds[key]();
        if (
          !cmd.isSymbol ||
          !cmd.ctrlSeq ||
          cmd.ctrlSeq.indexOf('\\') !== 0
        )
          continue;
        assertValidCtrlSeq(cmd.ctrlSeq);
      }
    }
  });

});
