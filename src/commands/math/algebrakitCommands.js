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
    if(MathQuill.latexSyntax=='STANDARD') {
      return '\\ ^{'+this.ends[L].latex()+'}\\!\\log {'+this.ends[R].latex()+'}';
    } else {
      return '\\lognl['+this.ends[L].latex()+']{'+this.ends[R].latex()+'}';
    }
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
    super_.init.call(this, '\\PolarVectorEn',  '(', ')', ',');
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
var AkitTextBlock =
LatexCmds.AkitTextBlock = P(BlockSymbol, function(_, super_) {
  _.init = function(ctrlSeq, symbolText) {
    super_.init.call(this, ctrlSeq,  symbolText);
  },
  _.latex = function() {
    if(MathQuill.latexSyntax=='STANDARD') {
      return '\\text{'+this.textTemplate[0]+'}'
    } else {
      return this.ctrlSeq;
    }
  }
});
// LatexCmds.NoSolutionEn = P(BlockSymbol, function(_, super_) {
//   _.init = function() {
//     super_.init.call(this, '\\TrueSolutionNl',  'waar');
//   },
//   _.latex = function() {
//     if(MathQuill.latexSyntax=='STANDARD') {
//       return '\\text{waar}'
//     } else {
//       return 'waar';
//     }
//   }
// });

LatexCmds.NoSolutionNl = bind(AkitTextBlock, '\\NoSolutionNl', 'kan niet');
LatexCmds.NoSolutionEn = bind(AkitTextBlock, '\\NoSolutionEn', 'no solution');
LatexCmds.NoSolutionFr = bind(AkitTextBlock, '\\NoSolutionFr', 'aucun solution');
LatexCmds.NoSolutionDe = bind(AkitTextBlock, '\\NoSolutionDe', 'kann nicht');

LatexCmds.TrueSolutionNl = bind(AkitTextBlock, '\\TrueSolutionNl', 'waar');
LatexCmds.TrueSolutionEn = bind(AkitTextBlock, '\\TrueSolutionEn', 'true');
LatexCmds.TrueSolutionFr = bind(AkitTextBlock, '\\TrueSolutionFr', 'vrai');
LatexCmds.TrueSolutionDe = bind(AkitTextBlock, '\\TrueSolutionDe', 'wahr');


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

var Underset =
  LatexCmds.underset = P(MathCommand, function(_, super_) {
  _.ctrlSeq = '\\underset';
  _.htmlTemplate =
      '<span class="mq-non-leaf">'
    +     '<span class="mq-array mq-non-leaf">'
    +       '<span>&1</span>'
    +       '<span>&0</span>'
    +     '</span>'
    + '</span>'
  ;
  _.textTemplate = ['underset(',',',')'];
  _.finalizeTree = function() {
    this.upInto = this.ends[L].upOutOf = this.ends[R];
    this.downInto = this.ends[R].downOutOf = this.ends[L];
  };
});

var Overset =
  LatexCmds.overset = P(MathCommand, function(_, super_) {
  _.ctrlSeq = '\\underset';
  _.htmlTemplate =
      '<span class="mq-non-leaf">'
    +     '<span class="mq-array mq-non-leaf">'
    +       '<span>&0</span>'
    +       '<span>&1</span>'
    +     '</span>'
    + '</span>'
  ;
  _.textTemplate = ['overset(',',',')'];
  _.finalizeTree = function() {
    this.upInto = this.ends[R].upOutOf = this.ends[L];
    this.downInto = this.ends[L].downOutOf = this.ends[R];
  };
});

LatexCmds.not = P(VanillaSymbol, function(_, super_) {
  // If one of these appears immediately after not, the
  // parser returns a different symbol.
  _.suffixes = {
    '\\in':       'notin',
    '\\ni':       'notni',
    '\\subset':   'notsubset',
    '\\subseteq': 'notsubseteq',
    '\\supset':   'notsupset',
    '\\supseteq': 'notsupseteq'
  };
  _.init = function() {
    return super_.init.call(this, '\\neg ', '&not;');
  };
  _.parser = function() {
    var succeed = Parser.succeed;
    var optWhitespace = Parser.optWhitespace;

    // Sort the suffixes, longest first
    var suffixes = Object.keys(_.suffixes).sort(function(a, b) {
      return b.length - a.length;
    });

    // Returns a parser matching any string in array
    function anyOf(strings) {
      var parser = Parser.string(strings.shift());
      return (strings.length) ? parser.or(anyOf(strings)) : parser;
    }

    return anyOf(suffixes).then(function(suffix) {
      return optWhitespace
        .then(succeed(LatexCmds[_.suffixes[suffix]]()));
    })
    .or(optWhitespace.then(succeed(this)));
  };
});