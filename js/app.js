// REQUIRED MODULES DECLARATIONS
var SublameFs = require('./js/sublame-fs').SublameFs,
    SublameUI = require('./js/sublame-ui').SublameUI,
    fs = require('fs');

// SVP
var sublameText, myCodeMirror, sublameFs, sublameUI,

    //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
    gui = require('nw.gui'),

    // Get the current window
    win = gui.Window.get();


window.onload = function () {
    sublameText = document.getElementById('sublame-text');

    myCodeMirror = CodeMirror.fromTextArea(sublameText, {
	lineNumbers: true,
	styleActiveLine: true,
        matchBrackets: true,
        extraKeys: {
            "F11": function (cm) {
                console.log(win);
                win.toggleFullscreen();
            },
            "Ctrl-S": function (cm) {
                sublameUI.saveDialog('#fileDialog', cm.getValue());
            },
            "Ctrl-O": function (cm) {
                sublameUI.openDialog('#openDialog');
            }
        }
    });

    myCodeMirror.setOption('isNewFile', true);

    myCodeMirror.setOption('theme', 'ambiance');
    myCodeMirror.setOption('mode', 'htmlmixed');

    myCodeMirror.setOption("fullScreen", !myCodeMirror.getOption("fullScreen"));

    myCodeMirror.focus();

    /**/
    sublameFs = new SublameFs(myCodeMirror);
    sublameUI = new SublameUI(myCodeMirror, win, document, sublameFs);
};
