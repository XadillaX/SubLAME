// var gui = require('nw.gui'),
//   	win = gui.Window.get();
//   	win.showDevTools();

var themes, getThemesPath;

getThemesPath = function (themeName) {
    return ['vendor/codemirror/theme/', themeName, '.css'].join('');
};

themes = [
    'monokai',
    'solarized',
    'tomorrow-night-eighties'
];

function changeTheme(cm) {
    var promptMsg, res;
    promptMsg = "Available themes are:\n" +
	themes.join('\n') +
	"\n";
    res = prompt(promptMsg);
    if (res) {
	cm.setOption('theme', themes[res]);
    }
}

window.onload = function () {

    var sublameText, myCodeMirror,
        gui = require('nw.gui'), //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
        win = gui.Window.get(); // Get the current window

    sublameText = document.getElementById('sublame-text');

    myCodeMirror = CodeMirror.fromTextArea(sublameText, {
	lineNumbers: true,
	styleActiveLine: true,
    	matchBrackets: true,
	extraKeys: {
	    "Ctrl-T": changeTheme
	}
    });

    myCodeMirror.setOption('theme', 'ambiance');
    myCodeMirror.setOption('mode', 'htmlmixed');

    myCodeMirror.setOption("fullScreen", !myCodeMirror.getOption("fullScreen"));

    myCodeMirror.focus();

};
