// var gui = require('nw.gui'),
//   	win = gui.Window.get();
//   	win.showDevTools();


window.onload = function () {
	function writeFile(fileName, text) {
        fs.writeFile(fileName, text, function(err) {
            if(err) {
                alert("error");
            }
        });
	}

    function openFile(fileName) {
        fs.readFile(fileName, 'utf-8', function (error, contents) {
            myCodeMirror.setValue(contents);
            myCodeMirror.setOption('isNewFile', false);
            myCodeMirror.setOption('fileName', fileName);
        }); 
    }

    function saveDialog(name, text) {
        var chooser = document.querySelector(name),
            fileName = null;

        console.log('isNewFile', myCodeMirror.getOption('isNewFile'));
        
        if (myCodeMirror.getOption('isNewFile')) {
	        chooser.addEventListener("change", function(evt) {
                fileName = this.value;
                writeFile(fileName, text);
                myCodeMirror.setOption('isNewFile', false);
                myCodeMirror.setOption('fileName', fileName);
                console.log(myCodeMirror.getOption('fileName'));
	        }, false);
            chooser.click(); 
	    } else {
            writeFile(myCodeMirror.getOption('fileName'), myCodeMirror.getValue());
	    }
    }

    function openDialog(name) {
        var chooser = document.querySelector(name),
            fileName = null;
        chooser.addEventListener("change", function(evt) {
            fileName = this.value;
            openFile(fileName);
        }, false);
        chooser.click();
    }


    var sublameText, myCodeMirror,
        gui = require('nw.gui'), //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
        fs = require('fs'),
        win = gui.Window.get(); // Get the current window

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

};
