var newButton, openButton, saveButton;
var editor;
var menu;
var fileEntry;
var hasWriteAccess;

var gui = require("nw.gui");
var fs = require("fs");
var clipboard = gui.Clipboard.get();
var resizeTimeout;

function newFile() {
  fileEntry = null;
  hasWriteAccess = false;
}

function setFile(theFileEntry, isWritable) {
  fileEntry = theFileEntry;
  hasWriteAccess = isWritable;
}

function readFileIntoEditor(theFileEntry) {
  fs.readFile(theFileEntry, function (err, data) {
    if (err) {
      console.log("Read failed: " + err);
    }

    editor.setValue(String(data));
  });
}

function writeEditorToFile(theFileEntry) {
  var str = editor.getValue();
  fs.writeFile(theFileEntry, editor.getValue(), function (err) {
    if (err) {
      console.log("Write failed: " + err);
      return;
    }

    console.log("Write completed.");
  });
}

var onChosenFileToOpen = function(theFileEntry) {
  setFile(theFileEntry, false);
  readFileIntoEditor(theFileEntry);
};

var onChosenFileToSave = function(theFileEntry) {
  setFile(theFileEntry, true);
  writeEditorToFile(theFileEntry);
};

function handleNewButton() {
  if (false) {
    newFile();
    editor.setValue("");
  } else {
    var x = window.screenX + 10;
    var y = window.screenY + 10;
    window.open('main.html', '_blank', 'screenX=' + x + ',screenY=' + y);
  }
}

function handleOpenButton() {
  $("#openFile").trigger("click");
}

function handleSaveButton() {
  if (fileEntry && hasWriteAccess) {
    writeEditorToFile(fileEntry);
  } else {
    $("#saveFile").trigger("click");
  }
}

function initContextMenu() {
  menu = new gui.Menu();
  menu.append(new gui.MenuItem({
    label: 'Copy',
    click: function() {
      clipboard.set(editor.getSelection());
    }
  }));
  menu.append(new gui.MenuItem({
    label: 'Cut',
    click: function() {
      clipboard.set(editor.getSelection());
      editor.replaceSelection('');
    }
  }));
  menu.append(new gui.MenuItem({
    label: 'Paste',
    click: function() {
      editor.replaceSelection(clipboard.get());
    }
  }));

  document.getElementById("editor").addEventListener('contextmenu',
                                                     function(ev) { 
    ev.preventDefault();
    menu.popup(ev.x, ev.y);
    return false;
  });
}


onload = function() {
  initContextMenu();

  newButton = document.getElementById("new");
  openButton = document.getElementById("open");
  saveButton = document.getElementById("save");

  newButton.addEventListener("click", handleNewButton);
  openButton.addEventListener("click", handleOpenButton);
  saveButton.addEventListener("click", handleSaveButton);

  $("#saveFile").change(function(evt) {
    onChosenFileToSave($(this).val());
  });
  $("#openFile").change(function(evt) {
    onChosenFileToOpen($(this).val());
  });

  
  editor = CodeMirror(
    document.getElementById("editor"),
    {
      theme: 'xq light',
      lineNumbers: false,
      lineWrapping: true,
      autofocus: true,
      viewportMargin: Infinity,
      mode: {
          name: 'markdown',
          highlightFormatting: true
      },
      extraKeys: {
        "Cmd-S": function(instance) { handleSaveButton() },
        "Ctrl-S": function(instance) { handleSaveButton() },
        "Enter": "newlineAndIndentContinueMarkdownList"
      }
    });

  newFile();
  onresize();

  gui.Window.get().show();

  

  var win = gui.Window.get();
  win.on('resize', onresize);
  initTitlebar();
  initLayout();
  initCountable();

};

initCountable = function() {
  Countable.live($('#editor')[0], function(counter) {
    $('#word-count').text(counter.words);
        $('#paragraph-count').text(counter.paragraphs);
        $('#character-count').text(counter.all);
  }, {
    hardReturns: false,
            stripTags: false,
            ignoreReturns: false
  });
};

onresize = function() {
  window.clearTimeout(resizeTimeout);
  editor.refresh();
  resizeTimeout = window.setTimeout(function(){
    var container = document.getElementById('editor');
      $("#editor").css("min-height", function(){ 
        return $('.middle-center').height();
    });
    
  },500);
  
}
