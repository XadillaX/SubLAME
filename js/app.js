var gui = require('nw.gui'),
  	win = gui.Window.get();
  	win.showDevTools();

window.onload = function () {
	var inferiorText = document.getElementById('inferior-text'),
		myCodeMirror = CodeMirror.fromTextArea(inferiorText, {
			lineNumbers: true
		});
};