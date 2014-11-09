(function() {
  'use strict';

  var listRE = /^(\s*)([*+-]|(\d+)\.) (\s*)/,
      unorderedBullets = '*+-';

  CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
    var pos = cm.getCursor(),
        inList = cm.getStateAfter(pos.line).list,
        match,
        line;

        line = cm.getLine(pos.line);
        console.log(inList);

    if (!(match = cm.getLine(pos.line).match(listRE))) {
      console.log('no match');
      cm.execCommand('newlineAndIndent');
      return;
    }

    var indent = match[1], after = match[4] + ' ';
    var bullet = unorderedBullets.indexOf(match[2]) >= 0
      ? match[2]
      : (parseInt(match[3], 10) + 1) + '.';
      console.log(line.toString());
      if (line.toString().length <= 2)
      {
        cm.replaceRange('', {line: pos.line, 
                              ch: 0},{line: pos.line, ch: line.toString().length});
        cm.execCommand('newlineAndIndent');
        return;
      }
    cm.replaceSelection('\n' + indent + bullet + after, 'end');
  };

}());