/**
 * AlgebraKiT
 */

// Dutch notation for logarithm: notation like: {}^3 log{9}.
// we will use nonstandard latex-like notation: lognl[3]{9}
var LogNL =
LatexCmds.lognl = P(MathCommand, function(_, super_) {
  _.ctrlSeq = '\\lognl';
  _.htmlTemplate =
      '<span class="mq-non-leaf">'
    +   '<span class="mq-supsub mq-non-leaf mq-sup-only">'
    +     '<span class="mq-sup">&0</span>'
    +   '</span>'
    +   '<span class="mq-operator-name">log</span>'
    +   '<span class="mq-non-leaf">'
    +     '<span class="mq-scaled mq-paren">(</span>'
    +     '<span class="mq-non-leaf">&1</span>'
    +     '<span class="mq-scaled mq-paren">)</span>'
    +   '</span>'
    + '</span>'
  ;
  _.parser = function() {
    return latexMathParser.optBlock.then(function(optBlock) {
      return latexMathParser.block.map(function(block) {
        var lognl = LogNL();
        lognl.blocks = [ optBlock, block ];
        optBlock.adopt(lognl, 0, 0);
        block.adopt(lognl, optBlock, 0);
        return lognl;
      });
    }).or(super_.parser.call(this));
  };
  _.textTemplate = ['lognl[', '](', ')'];
  _.latex = function() {
    return '\\lognl['+this.ends[L].latex()+']{'+this.ends[R].latex()+'}';
  };
  _.reflow = function() {
    var argjQ = this.jQ.children('.mq-non-leaf').last();
    var contentjQ = argjQ.children(':eq(1)');
    var height = contentjQ.outerHeight()
                 / parseFloat(contentjQ.css('fontSize'));
    var parens = argjQ.children('.mq-paren');
    if (parens.length) {
      scale(parens, min(1 + .2*(height - 1), 1.2), 1.2*height);
    }
  }
});

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

LatexCmds.cases = P(Matrix, function(_, super_) {
  _.environment = 'cases';
  _.parentheses = {
    left: '{',
  };
  _.createBlocks = function() {
    this.blocks = [
      MatrixCell(0, this),
      MatrixCell(1, this)
    ];
  };
});