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

//LatexCmds.diff = LatexCmds.diff = bind(VanillaSymbol,'\\diff ','d');
LatexCmds.diff = P(VanillaSymbol, function(_, super_) {
  _.init = function() {
    super_.init.call(this, '\\diff', 'd');
  };
  _.latex = function() {
    if(MathQuill.latexSyntax=='STANDARD') {
      return 'd';
    } else {
      return '\\diff';
    }
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

LatexCmds.not = P(VanillaSymbol, function (_, super_) {
  // If one of these appears immediately after not, the
  // parser returns a different symbol.
  _.suffixes = {
    '\\in': 'notin',
    '\\ni': 'notni',
    '\\subset': 'notsubset',
    '\\subseteq': 'notsubseteq',
    '\\supset': 'notsupset',
    '\\supseteq': 'notsupseteq',
    '\\perp': 'nperp',
  };
  _.init = function () {
    return super_.init.call(this, '\\neg ', '&not;');
  };
  _.parser = function () {
    var succeed = Parser.succeed;
    var optWhitespace = Parser.optWhitespace;

    // Sort the suffixes, longest first
    var suffixes = Object.keys(_.suffixes).sort(function (a, b) {
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

LatexCmds.verb = P(MathCommand, function(_, super_) {
  _.ctrlSeq = '\\verb';
  // _.init = function(ctrlSeq, html, text) {
  //   if (!text) text = 'text'
  //   super_.init.call(this, ctrlSeq, html, [ text ]);
  // };

  _.html = function() {
    return (
        '<span class="mq-text-mode mq-akit-verb" mathquill-command-id='+this.id+'>'
      +   this.textContents()
      + '</span>'
    );
    }

  _.latex = function(){ 
    return '\\verb|'+this.textContents().trim()+'|';
  };
  _.text = function(){ return "'"+this.textContents()+"'" };
  
  _.parser = function() { 
      var textBlock = this;

      // TODO: correctly parse text mode
      var string = Parser.string;
      var regex = Parser.regex;
      var optWhitespace = Parser.optWhitespace;
      return optWhitespace
        .then(string('|')).then(regex(/^[^\|]*/)).skip(string('|'))
        .map(function(text) {
          if (text.length === 0) return Fragment();

          TextPiece(text).adopt(textBlock, 0, 0);
          return textBlock;
        });
    };

    _.createLeftOf = function(cursor) {
      var textBlock = this;
      super_.createLeftOf.call(this, cursor);
    
      if (textBlock[R].siblingCreated) textBlock[R].siblingCreated(cursor.options, L);
      if (textBlock[L].siblingCreated) textBlock[L].siblingCreated(cursor.options, R);
      textBlock.bubble('reflow');
    
      cursor.insAtRightEnd(textBlock);
    
      if (textBlock.replacedText)
        for (var i = 0; i < textBlock.replacedText.length; i += 1)
          textBlock.write(cursor, textBlock.replacedText.charAt(i));
    };
    
    
  _.numBlocks = function() { return 1; };

  _.write = function(cursor, ch) {
    if(!ch.match(/\w/)) return;
    
    cursor.show().deleteSelection();

    if (!cursor[L]) TextPiece(ch).createLeftOf(cursor);
    else cursor[L].appendText(ch);

    this.bubble('reflow');
  };

  _.seek = function(pageX, cursor) {
    cursor.hide();
    var textPc = fuseChildren(this);

    // insert cursor at approx position in DOMTextNode
    var avgChWidth = this.jQ.width()/this.textContents().length;
    var approxPosition = Math.round((pageX - this.jQ.offset().left)/avgChWidth);
    if (approxPosition <= 0) cursor.insAtLeftEnd(this);
    else if (approxPosition >= textPc.text.length) cursor.insAtRightEnd(this);
    else cursor.insLeftOf(textPc.splitRight(approxPosition));

    // move towards mousedown (pageX)
    var displ = pageX - cursor.show().offset().left; // displacement
    var dir = displ && displ < 0 ? L : R;
    var prevDispl = dir;
    // displ * prevDispl > 0 iff displacement direction === previous direction
    while (cursor[dir] && displ * prevDispl > 0) {
      cursor[dir].moveTowards(dir, cursor);
      prevDispl = displ;
      displ = pageX - cursor.offset().left;
    }
    if (dir*displ < -dir*prevDispl) cursor[-dir].moveTowards(-dir, cursor);

    if (!cursor.anticursor) {
      // about to start mouse-selecting, the anticursor is gonna get put here
      this.anticursorPosition = cursor[L] && cursor[L].text.length;
      // ^ get it? 'cos if there's no cursor[L], it's 0... I'm a terrible person.
    }
    else if (cursor.anticursor.parent === this) {
      // mouse-selecting within this TextBlock, re-insert the anticursor
      var cursorPosition = cursor[L] && cursor[L].text.length;;
      if (this.anticursorPosition === cursorPosition) {
        cursor.anticursor = Point.copy(cursor);
      }
      else {
        if (this.anticursorPosition < cursorPosition) {
          var newTextPc = cursor[L].splitRight(this.anticursorPosition);
          cursor[L] = newTextPc;
        }
        else {
          var newTextPc = cursor[R].splitRight(this.anticursorPosition - cursorPosition);
        }
        cursor.anticursor = Point(this, newTextPc[L], newTextPc);
      }
    }
  };

  // editability methods: called by the cursor for editing, cursor movements,
  // and selection of the MathQuill tree, these all take in a direction and
  // the cursor
  _.moveTowards = function(dir, cursor) { cursor.insAtDirEnd(-dir, this); };
  _.moveOutOf = function(dir, cursor) { cursor.insDirOf(dir, this); };
  _.unselectInto = _.moveTowards;

  // TODO: make these methods part of a shared mixin or something.
  _.selectTowards = MathCommand.prototype.selectTowards;
  _.deleteTowards = MathCommand.prototype.deleteTowards;

  _.selectOutOf = function(dir, cursor) {
    cursor.insDirOf(dir, this);
  };
  _.deleteOutOf = function(dir, cursor) {
    // backspace and delete at ends of block don't unwrap
    if (this.isEmpty()) cursor.insRightOf(this);
  };

  _.focus = MathBlock.prototype.focus;
  _.blur = function(cursor) {
    MathBlock.prototype.blur.call(this);
    if (!cursor) return;
    if (this.textContents() === '') {
      this.remove();
      if (cursor[L] === this) cursor[L] = this[L];
      else if (cursor[R] === this) cursor[R] = this[R];
    }
    else fuseChildren(this);
  };

  function fuseChildren(self) {
    self.jQ[0].normalize();

    var textPcDom = self.jQ[0].firstChild;
    if (!textPcDom) return;
    pray('only node in TextBlock span is Text node', textPcDom.nodeType === 3);
    // nodeType === 3 has meant a Text node since ancient times:
    //   http://reference.sitepoint.com/javascript/Node/nodeType

    var textPc = TextPiece(textPcDom.data);
    textPc.jQadd(textPcDom);

    self.children().disown();
    return textPc.adopt(self, 0, 0);
  }

  _.jQadd = function(jQ) {
    super_.jQadd.call(this, jQ);
    if (this.ends[L]) this.ends[L].jQadd(this.jQ[0].firstChild);
  };
  
  _.textContents = function() {
    return this.foldChildren('', function(text, child) {
      return text + child.text;
    });
  };


})