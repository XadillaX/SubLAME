// var gui = require('nw.gui'),
//   	win = gui.Window.get();
//   	win.showDevTools();


window.onload = function () {
	var sublameText = document.getElementById('sublame-text'),
		myCodeMirror = null;



	myCodeMirror = CodeMirror.fromTextArea(sublameText, {
		lineNumbers: true,
		styleActiveLine: true,
    	matchBrackets: true
	});
	myCodeMirror.setOption('theme', 'ambiance');
	myCodeMirror.setOption('mode', 'htmlmixed');

	

	myCodeMirror.focus();
};