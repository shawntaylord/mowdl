window.onload = function() {
  var start = document.getElementById('launch');
  start.addEventListener('click', function(event) {
    var mowdl = new Mowdl({
      header: true,
      headerContent: '#header-content',
      bodyContent: '#mowdl-content',
      footer: true,
      maxWidth: 500,
    });
    mowdl.open();
    event.preventDefault();
  });
}
