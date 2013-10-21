/*********************************************************
 * The actual jQuery plugin and document ready handlers.
 ********************************************************/

//The publicy exposed method of jQuery.prototype, available (and meant to be
//called) on jQuery-wrapped HTML DOM elements.
jQuery.fn.mathquill = function(cmd, latex) {
  switch (cmd) {
  case 'redraw':
    return this.each(function() {
      var blockId = $(this).attr(mqBlockId),
        rootBlock = blockId && MathElement[blockId];
      if (rootBlock) {
        (function postOrderRedraw(el) {
          el.eachChild(postOrderRedraw);
          if (el.redraw) el.redraw();
        }(rootBlock));
      }
    });
  case 'revert':
    return this.each(function() {
      var blockId = $(this).attr(mqBlockId),
        block = blockId && MathElement[blockId];
      if (block && block.revert)
        block.revert();
    });
  case 'latex':
    if (arguments.length > 1) {
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId];
        if (block)
          block.renderLatex(latex);
      });
    }

    var blockId = $(this).attr(mqBlockId),
      block = blockId && MathElement[blockId];
    return block && block.latex();
  case 'text':
    var blockId = $(this).attr(mqBlockId),
      block = blockId && MathElement[blockId];
    return block && block.text();
  case 'html':
    return this.html().replace(/ ?hasCursor|hasCursor /, '')
      .replace(/ class=(""|(?= |>))/g, '')
      .replace(/<span class="?cursor( blink)?"?><\/span>/i, '')
      .replace(/<span class="?textarea"?><textarea><\/textarea><\/span>/i, '');
  case 'write':
    if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

        if (cursor)
          cursor.writeLatex(latex).parent.blur();
      });
  case 'cmd':
    if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

        if (cursor) {
          var seln = cursor.prepareWrite();
          if (/^\\[a-z]+$/i.test(latex)) cursor.insertCmd(latex.slice(1), seln);
          else cursor.insertCh(latex, seln);
          cursor.hide().parent.blur();
        }
      });
  case 'writesimpfunc':
      if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

          if (cursor) {
          	  if (cursor.selection) {
          	  	  cursor.writeLatex(latex+'{'+cursor.selection.latex()+'}').parent.blur();
          	  } else {
          	  	  cursor.writeLatex(latex+'{}').parent.blur();
          	  }
          	  cursor.moveLeft();
          }
      });
  case 'writefunc':
      if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

          if (cursor) {
          	  if (cursor.selection) {
          	  	  cursor.writeLatex(latex+'\\left('+cursor.selection.latex()+'\\right)').parent.blur();
          	  } else {
          	  	  cursor.writeLatex(latex+'\\left(\\right)').parent.blur();
          	  }
          	  cursor.moveLeft();
          }
      });
  case 'movecursor':
      if (arguments.length > 1)
      return this.each(function() {
          var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;
          if (cursor) {
          	  if (latex=='b') {
          	  	  cursor.backspace();
          	  } else {
			  cursor.clearSelection().show();
			  if (latex=='l') { cursor.moveLeft();}
			  else if (latex=='r') {cursor.moveRight();}
			  else if (latex=='u') { cursor.moveUp();} 
			  else if (latex=='d') {cursor.moveDown();}
          	  }
          }
      });
   case 'writefrac':
    if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;
          
           if (cursor) {
          	  if (cursor.selection) {
          	  	  cursor.writeLatex('\\frac{'+cursor.selection.latex()+'}{}').parent.blur();
          	  } else {
          	  	  cursor.writeLatex('\\frac{}{}').parent.blur();
          	  	  cursor.moveLeft();
          	  }
          	  cursor.moveLeft();
          }
      });
   case 'writeint':
    if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

        if (latex=='[') {
        	var left = '\\left[';
        	var right = '\\right]';
        } else if (latex=='(') {
        	var left = '\\left(';
        	var right = '\\right)';
        } else {
        	var left = latex+'{';
        	var right = '}';
        }
        if (cursor) {
        	if (cursor.selection) {
        		  if (cursor.selection.latex().match(/,/)) {
        		  	  cursor.writeLatex(left+cursor.selection.latex()+right).parent.blur();
        		  } else {
        		  	  cursor.writeLatex(left+cursor.selection.latex()+','+right).parent.blur();
        		  }
          	} else {
          	  	  cursor.writeLatex(left+','+right).parent.blur();
          	  	  cursor.moveLeft();
          	}
          	cursor.moveLeft();
        }
      });
  case 'writebracket':
  	if (arguments.length > 1)
      return this.each(function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

        if (latex=='[') {
        	var left = '\\left[';
        	var right = '\\right]';
        } else if (latex=='(') {
        	var left = '\\left(';
        	var right = '\\right)';
        } else if (latex=='|') {
        	var left = '\\left|';
        	var right = '\\right|';
        }
        if (cursor) {
        	if (cursor.selection) {
        		  cursor.writeLatex(left+cursor.selection.latex()+right).parent.blur();
          	} else {
          	
          	  	  cursor.writeLatex(left+right).parent.blur();
          	}
          	cursor.moveLeft();
        }  
     });  
  	  
  default:
    var textbox = cmd === 'textbox',
      editable = textbox || cmd === 'editable',
      RootBlock = textbox ? RootTextBlock : RootMathBlock;
    return this.each(function() {
      createRoot($(this), RootBlock(), textbox, editable);
    });
  }
};

//on document ready, mathquill-ify all `<tag class="mathquill-*">latex</tag>`
//elements according to their CSS class.
jQuery(function() {
  jQuery('.mathquill-editable:not(.mathquill-rendered-math)').mathquill('editable');
  jQuery('.mathquill-textbox:not(.mathquill-rendered-math)').mathquill('textbox');
  jQuery('.mathquill-embedded-latex').mathquill();
});

