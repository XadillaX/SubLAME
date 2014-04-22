var themes = require('./js/sublame-themes');

window.onload = function () {
    var sublameText, myCodeMirror, gui, win;

    //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
    gui = require('nw.gui');
    // Get the current window
    win = gui.Window.get();

    sublameText = document.getElementById('sublame-text');

    myCodeMirror = CodeMirror.fromTextArea(sublameText, {
    	lineNumbers: true,
    	styleActiveLine: true,
    	matchBrackets: true,
    	extraKeys: {
    	    "Ctrl-T": themes.changeTheme
    	}
    });

    myCodeMirror.setOption('theme', 'ambiance');
    myCodeMirror.setOption('mode', 'htmlmixed');

    myCodeMirror.setOption("fullScreen", !myCodeMirror.getOption("fullScreen"));

    myCodeMirror.focus();

};
