// REQUIRED MODULES DECLARATIONS
var SublameFs = require('./js/sublame-fs').SublameFs,
    fs = require('fs');

// SVP
var sublameText, myCodeMirror, sublameFs,

    //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
    gui = require('nw.gui'),

    // Get the current window
    win = gui.Window.get();


window.onload = function () {
/* refactor to sublame-??? */
    function setWindowTitle(title) {
        win.title = title;
    }
/* refactor to sublame-??? */
    function saveDialog(name, text) {
        var chooser = document.querySelector(name),
            fileName = null;
        
        if (myCodeMirror.getOption('isNewFile')) {
	    chooser.addEventListener("change", function(evt) {
                fileName = this.value;
                sublameFs.writeFile(fileName, text);
                
		myCodeMirror.setOption('isNewFile', false);
                myCodeMirror.setOption('fileName', fileName);
                
		console.log(myCodeMirror.getOption('fileName'));
                setWindowTitle('SubLAME - ' + fileName);
	    }, false);
            chooser.click(); 
	} else {
	    sublameFs.writeFile(myCodeMirror.getOption('fileName'), myCodeMirror.getValue());
	}
    }

    function openDialog(name) {
        var chooser = document.querySelector(name),
            fileName = null;
        
	chooser.addEventListener("change", function(evt) {
            fileName = this.value;
            sublameFs.openFile(fileName);

            setWindowTitle('SubLAME - ' + fileName);
        }, false);
        
	chooser.click();
    }
/**/

    sublameText = document.getElementById('sublame-text');

    myCodeMirror = CodeMirror.fromTextArea(sublameText, {
	lineNumbers: true,
	styleActiveLine: true,
        matchBrackets: true,
        extraKeys: {
            "F11": function (cm) {
                console.log(win);
                win.toggleFullscreen()
            },
            "Ctrl-S": function (cm) {
                saveDialog('#fileDialog', cm.getValue());
            },
            "Ctrl-O": function (cm) {
                openDialog('#openDialog');
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
};
