// var gui = require('nw.gui'),
//   	win = gui.Window.get();
//   	win.showDevTools();


window.onload = function () {
    function saveFile(name, text) {
        var chooser = document.querySelector(name);
        chooser.addEventListener("change", function(evt) {
            fs.writeFile(this.value, text, function(err) {
                if(err) {
                    alert("error");
                }
            });
        }, false);

        chooser.click();  
    }


    var sublameText, myCodeMirror,
        gui = require('nw.gui'), //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
        // fs = require('js'),
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
                alert(this.value);
                saveFile('#fileDialog', this.value);
            }
        }
    });

    myCodeMirror.setOption('theme', 'ambiance');
    myCodeMirror.setOption('mode', 'htmlmixed');

    myCodeMirror.setOption("fullScreen", !myCodeMirror.getOption("fullScreen"));

    myCodeMirror.focus();

};
