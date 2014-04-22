// requires
var _ = require('underscore');

// SVP
var themes, getThemesPath, win, popupTemplate, doc;

// Global window and document objects.
win = window;
doc = win.document;

// List of available themes we can switch to.
themes = [
    'monokai',
    'solarized',
    'tomorrow-night-eighties'
];

function getThemesPath(themeName) {
    return ['/vendor/codemirror/theme/', themeName, '.css'].join('');
}

// DOM
popupTemplate = (function () {
    var div, ul, li, a, template;

    div = doc.createElement('div');
    ul = doc.createElement('ul');
    template = _.template("<%= theme %>")

    _.each(themes, function (theme) {
        li = doc.createElement('li');
        a = doc.createElement('a');
        a.innerHTML = template({theme: theme});
        a.href = "#" + theme;

        a.addEventListener('click', changeTheme);

        li.appendChild(a)
        ul.appendChild(li);
    });

    div.appendChild(ul);
    div.className = "options-popup";

    return div;
}());

function showPopup(cm) {
    doc.body.appendChild(popupTemplate);
}

//
function changeTheme(cm) {
    var promptMsg, res;
    promptMsg = "Available themes are:\n" +
                themes.join('\n') +
                "\n";
    res = win.prompt(promptMsg);
    if (res) {
        cm.setOption('theme', themes[res]);
    }
}

exports.availableThemes = themes;
exports.getThemesPath = getThemesPath;
exports.showPopup = showPopup;
exports.changeTheme = changeTheme;
