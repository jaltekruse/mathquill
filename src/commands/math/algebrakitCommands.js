/**
 * AlgebraKiT
 */
// Dutch notations for intervals
LatexCmds.IntervalNlExEx = bind(IntervalCommand, '\\IntervalNlExEx', '&lang;', '&rang;', ';');
LatexCmds.IntervalNlExIn = bind(IntervalCommand, '\\IntervalNlExIn', '&lang;', ']', ';');
LatexCmds.IntervalNlInEx = bind(IntervalCommand, '\\IntervalNlInEx', '[', '&rang;', ';');
LatexCmds.IntervalNlInIn = bind(IntervalCommand, '\\IntervalNlInIn', '[', ']', ';');
// Belgium notations for intervals
LatexCmds.IntervalBeExEx = bind(IntervalCommand, '\\IntervalBeExEx', ']', '[', ';');
LatexCmds.IntervalBeExIn = bind(IntervalCommand, '\\IntervalBeExIn', ']', ']', ';');
LatexCmds.IntervalBeInEx = bind(IntervalCommand, '\\IntervalBeInEx', '[', '[', ';');
LatexCmds.IntervalBeInIn = bind(IntervalCommand, '\\IntervalBeInIn', '[', ']', ';');
// English notations for intervals
LatexCmds.IntervalEnExEx = bind(IntervalCommand, '\\IntervalEnExEx', '(', ')', ',');
LatexCmds.IntervalEnExIn = bind(IntervalCommand, '\\IntervalEnExIn', '(', ']', ',');
LatexCmds.IntervalEnInEx = bind(IntervalCommand, '\\IntervalEnInEx', '[', ')', ',');
LatexCmds.IntervalEnInIn = bind(IntervalCommand, '\\IntervalEnInIn', '[', ']', ',');

LatexCmds.PolarVector =
LatexCmds.PolarVectorEn = P(IntervalCommand, function(_, super_) {
  _.init = function() {
    super_.init.call(this, '\\PolarVectorEn', '(', ')', ',');
  }
  _.latex = function(){
    return '\\left(' + this.ends[L].latex() + ',' + this.ends[R].latex() + '\\right)';
  }
});

LatexCmds.PolarVectorNl = P(IntervalCommand, function(_, super_) {
  _.init = function() {
    super_.init.call(this, '\\PolarVectorNl', '(', ')', ';');
  }
  _.latex = function(){
    return '\\left(' + this.ends[L].latex() + ';' + this.ends[R].latex() + '\\right)';
  }
});

// Custom commands for language-specific solution tags
LatexCmds.NoSolutionNl = bind(BlockSymbol, '\\NoSolutionNl', 'kan niet');
LatexCmds.NoSolutionEn = bind(BlockSymbol, '\\NoSolutionEn', 'no solution');
LatexCmds.NoSolutionFr = bind(BlockSymbol, '\\NoSolutionFr', 'aucun solution');
LatexCmds.NoSolutionDe = bind(BlockSymbol, '\\NoSolutionDe', 'kann nicht');

LatexCmds.TrueSolutionNl = bind(BlockSymbol, '\\TrueSolutionNl', 'waar');
LatexCmds.TrueSolutionEn = bind(BlockSymbol, '\\TrueSolutionEn', 'true');
LatexCmds.TrueSolutionFr = bind(BlockSymbol, '\\TrueSolutionFr', 'vrai');
LatexCmds.TrueSolutionDe = bind(BlockSymbol, '\\TrueSolutionDe', 'wahr');

LatexCmds.SpaceVector = P(Matrix, function(_, super_) {
  _.environment = 'pmatrix';
  _.parentheses = {
    left: '(',
    right: ')'
  };
  _.createBlocks = function() {
    this.blocks = [
      MatrixCell(0, this),
      MatrixCell(1, this),
      MatrixCell(2, this)
    ];
  };
});

LatexCmds.PlaneVector = P(Matrix, function(_, super_) {
  _.environment = 'pmatrix';
  _.parentheses = {
    left: '(',
    right: ')'
  };
  _.createBlocks = function() {
    this.blocks = [
      MatrixCell(0, this),
      MatrixCell(1, this)
    ];
  };
});