//allow addition of new commands via config
//cmds is object: {symbol:[symboltype, latex, entity]}
//where symboltype is "VanillaSymbol", "BinaryOperator", or "Variable"
optionProcessors.addCommands = function(cmds) {	
  for (var str in cmds) {
    if (LatexCmds.hasOwnProperty(str)) {
      throw '"' + str + '" is a built-in operator name';
    }
    if (cmds[str].length != 3) {
      throw '"' + str + '" does not have the required number of elements';
    }
    if (cmds[str][0] == 'VanillaSymbol') {
      LatexCmds[str] = bind(VanillaSymbol, cmds[str][1], cmds[str][2]);
    } else if (cmds[str][0] == 'BinarySymbol') {
      LatexCmds[str] = bind(BinarySymbol, cmds[str][1], cmds[str][2]);
    } else if (cmds[str][0] == 'Variable') {
      LatexCmds[str] = bind(Variable, cmds[str][1], cmds[str][2]);
    } else {
      throw '"' + str + '" is using an unsupported symbol type';	    
    }
  }
};
