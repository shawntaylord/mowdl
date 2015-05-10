window.onload = function() {
  var start = document.getElementById('launch');
  start.onclick = function() {
    var mowdl = new Mowdl();
    mowdl.open();
  }
}
