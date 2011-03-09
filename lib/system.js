
// -- tlrobinson Tom Robinson
var IO = require("./io").IO;

exports.print = function () {
    exports.stdout.write(Array.prototype.join.call(arguments, " ") + "\n").flush();
};

exports.stdin  = new IO(_stdin, null);
exports.stdout = new IO(null, _stdout);
exports.stderr = new IO(null, _stderr);

exports.args = _args;
exports.env = _env;

delete _env, _args, _stdout, _stderr;//, _stdin;

exports.fs = require("./file");

// default logger
var Logger = require("logger").Logger;
exports.log = new Logger(exports.stderr);
