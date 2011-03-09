
// IO: default
// -- tlrobinson Tom Robinson

var IO = exports.IO = function(input, output) {
    this.input = input;
    this.output = output;
}

IO.prototype.read = function(length) {
    return this.input.read(length);
}

IO.prototype.write = function(object) {
    this.output.write(String(object));
    return this;
}

IO.prototype.flush = function() {
    return this;
}

IO.prototype.close = function() {
}

exports.TextIOWrapper = function (raw, mode, lineBuffering, buffering, charset, options) {
    return raw;
}
