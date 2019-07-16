suite('latex cmds', function() {
  var LatexCmds;
  setup(function() {
    var mathField = MQ.MathField($('<span></span>').appendTo('#mock')[0]);
    LatexCmds = mathField.__controller.LatexCmds;
  });

  function assertValidCtrlSeq(ctrlSeq) {
    assert.ok(
      /^\\.*\s$/.test(ctrlSeq),
      ctrlSeq + ' is a valid control sequence'
    );
  }

  test('validating LatexCmds control sequences', function() {
    for (var key in LatexCmds) {
      if (LatexCmds.hasOwnProperty(key)) {
        var cmd = LatexCmds[key];
        assertValidCtrlSeq(cmd.ctrlSeq);
      }
    }
  });

});
