function closeWindow() {
  window.close();
}

function initTitlebar() {
  $('.titlebar-close-button').on('click',function() {
    closeWindow();
  });

}
