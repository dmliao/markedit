
function closeWindow() {
  window.close();
}

function initTitlebar() {
  var gui = require('nw.gui');
  var win = gui.Window.get();
  $('#unmaximize-button').hide();
  $('#close-button').on('click',function() {
    closeWindow();
  });
  $('#minimize-button').on('click', function() {
    win.minimize();
  });
  $('body').on('click','#maximize-button', function() {
    win.maximize();
    $('#maximize-button').hide();
    $('#unmaximize-button').show();

  });
  $('body').on('click','#unmaximize-button', function() {
    win.unmaximize();
    $('#unmaximize-button').hide();
    $('#maximize-button').show();
  });

}
