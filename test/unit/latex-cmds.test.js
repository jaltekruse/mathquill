suite('latex cmds', function() {
  var LatexCmds;
  setup(function() {
    var mathField = MQ.MathField($('<span></span>').appendTo('#mock')[0]);
    LatexCmds = mathField.__controller.LatexCmds;
  });

  function assertValidCtrlSeq(ctrlSeq) {
    assert.ok(
      /^\\[a-zA-Z]*.*[^A-Za-z]$/.test(ctrlSeq),
      ctrlSeq + ' is a valid control sequence'
    );
  }

  function assertInvalidCtrlSeq(ctrlSeq) {
    assert.ok(
      !/^\\[a-zA-Z]*.*[^A-Za-z]$/.test(ctrlSeq),
      ctrlSeq + ' is an invalid control sequence'
    );
  }

  test('validating LatexCmds control sequences for math symbols', function() {
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

  test('testing specific valid and invalid control sequences', function() {
    assertValidCtrlSeq('\\test ');
    assertValidCtrlSeq('\\thing{N}');
    assertValidCtrlSeq('\\$');
    assertValidCtrlSeq('\\ ');
    assertValidCtrlSeq('\\not\\ni ');
    assertInvalidCtrlSeq('\\test');
    assertInvalidCtrlSeq('test');
    assertInvalidCtrlSeq('test ');
    assertInvalidCtrlSeq('\\thing{N');
  });
});
