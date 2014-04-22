var SublameUI = function (codeMirror, ngWin, browserDocument, fileSystemService) {
    if (!codeMirror || !ngWin || !browserDocument || !fileSystemService) {
	throw "ClassDependenciesNotFulfilledException";
    }

    this.window = ngWin;
    this.doc = browserDocument;
    this.codeMirror = codeMirror;
    this.fsService = fileSystemService;
};

SublameUI.prototype.setWindowTitle = function (title) {
    // Maybe consider creating a wrapper class for window stuff
    // as it stands this class may know a little to much.
    this.window.title = title;
};

SublameUI.prototype.saveDialog = function (name, text) {
    var chooser, fileName, self;
    
    chooser = this.doc.querySelector(name);
    self = this;
        
    if (self.codeMirror.getOption('isNewFile')) {
	chooser.addEventListener("change", function(evt) {
            fileName = this.value;
	    self.fsService.writeFile(fileName, text);
            
	    self.codeMirror.setOption('isNewFile', false);
            self.codeMirror.setOption('fileName', fileName);
                
	    console.log(self.codeMirror.getOption('fileName'));
            self.setWindowTitle('SubLAME - ' + fileName);
	}, false); // I don't know why we specify false here, isn't false by default?
        chooser.click(); 
    } else {
	self.fsService.writeFile(self.codeMirror.getOption('fileName'), self.codeMirror.getValue());
    }
};

SublameUI.prototype.openDialog = function (name) {
    var chooser, fileName, self;
    chooser = this.doc.querySelector(name);
    self = this;
        
    chooser.addEventListener("change", function(evt) {
        fileName = this.value;
	self.fsService.openFile(fileName);	
        self.setWindowTitle('SubLAME - ' + fileName);
    }, false); // I don't know why we specify false here, isn't false by default?
        
    chooser.click();
};


exports.SublameUI = SublameUI;
