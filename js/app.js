// var gui = require('nw.gui'),
//   	win = gui.Window.get();
//   	win.showDevTools();


window.onload = function () {
    var sublameText, myCodeMirror;

    sublameText = document.getElementById('sublame-text');

    myCodeMirror = CodeMirror.fromTextArea(sublameText, {
	lineNumbers: true,
	styleActiveLine: true,
    	matchBrackets: true,
	extraKeys: {
            //key binding for toggle full screen on/off
            "F2": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            //key binding for switch full screen off
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        }
    });

    myCodeMirror.setOption('theme', 'ambiance');
    myCodeMirror.setOption('mode', 'htmlmixed');

    myCodeMirror.setOption("fullScreen", !myCodeMirror.getOption("fullScreen"));

    myCodeMirror.focus();

};
