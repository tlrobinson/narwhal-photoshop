
var exports = require('./file');
var IO = require("io").IO;

exports.FileIO = function(path, mode, permissions) {
    mode = exports.mode(mode);

    if (mode.update) {
        throw new Error("Updating IO not yet implemented.");
    } else if (mode.write || mode.append) {
        var f = new File(path);
        f.lineFeed = "Unix";
        f.open("w");
        f.encoding = "UTF8";
        return new IO(null, f);
    } else if (mode.read) {
        var f = new File(path);
        f.lineFeed = "Unix";
        f.open("r");
        f.encoding = "UTF8";
        return new IO(f, null);
    } else {
        throw new Error("Files must be opened either for read, write, or update mode.");
    }
}

exports.mtime = function(path) {
    return new File(exports.absolute(path)).modified;
}

exports.exists = function(path) {
    return new File(exports.absolute(path)).exists;
}

exports.size = function(path) {
    return new File(exports.absolute(path)).length;
}

exports.isFile = function(path) {
    return exports.exists(path) && exports.size(path) >= 0;
}

exports.isDirectory = function(path) {
    return exports.exists(path) && exports.size(path) < 0;
}

var methods =
["canonical"
,"chmod"
,"chown"
,"exists"
,"isDirectory"
,"isLink"
,"isReadable"
,"isWritable"
,"link"
,"linkExists"
,"list"
,"mkdir"
,"mkdirs"
,"move"
,"remove"
,"rename"
,"rmdir"
,"size"
,"stat"
,"symlink"
,"touch"
];

for (var i = 0; i < methods.length; i++) { (function(method) {
    if (!exports[method]) {
        exports[method] = function() { console.log("NYI: " + method); }
    }
})(methods[i])}
