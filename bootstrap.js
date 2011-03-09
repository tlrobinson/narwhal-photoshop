(function bootstrap(evalGlobal) {

    var global = this;
    var env = _env, args = _args;

    function envEnabled(name) {
        return env[name] && parseInt(env[name]) !== 0;
    }

    var prefix = env["NARWHAL_HOME"];
    var enginePrefix = env["NARWHAL_ENGINE_HOME"];

    var debug = envEnabled("NARWHAL_DEBUG");
    var verbose = envEnabled("NARWHAL_VERBOSE");

    var pipePrefix = "/tmp/narwhal-photoshop-"+env["NARWHAL_PID"]+"-";

    var stdout = new File(pipePrefix+"stdout")
    stdout.lineFeed = "Unix";
    stdout.open("w");
    stdout.encoding = "UTF8";

    var stderr = new File(pipePrefix+"stderr")
    stderr.lineFeed = "Unix";
    stderr.open("w");
    stderr.encoding = "UTF8";

    var stdin = new File(pipePrefix+"stdin")
    stdin.lineFeed = "Unix";
    // stdin.open("r"); // FIXME! this hangs until something is written to the pipe
    stdin.encoding = "UTF8";

    _stdout = stdout;
    _stderr = stderr;
    _stdin = stdin;

    console = {
        log : function() { stdout.write(Array.prototype.join.call(arguments, " ")+"\n"); }
    }

    function _print(str) {
        stdout.write(String(str)+"\n");
    }

    function isFile(path) {
        var f = new File(path);
        var result = false;
        if (f.exists) {
            // FIXME: meh
            f.open("r");
            try {
                result = !f.eof;
            } finally {
                f.close();
            }
        }
        return result;
    }

    function read(path) {
        var f = new File(path)
        f.lineFeed = "Unix";
        f.open("r"); // open as write
        f.encoding = "UTF8";
        var result = "";
        while (!f.eof) {
            result += f.readln()+"\n";
        }
        return result;
    }

    var narwhal = evalGlobal(read(prefix + "/narwhal.js"));
    try {
        narwhal({
            global: global,
            evalGlobal: evalGlobal,
            engine: "photoshop",
            engines: ["photoshop", "default"],
            prefix: prefix,
            prefixes: [enginePrefix, prefix],
            print: _print,
            evaluate: function evaluate(text, fileName, lineNumber) {
                return new Function("require", "exports", "module", "system", "print", text);
                //return evalGlobal("(function(require,exports,module,system,print){" + text + "\n})");
            },
            fs: {
                read: read,
                isFile: isFile
            },
            os : "darwin",
            debug: debug,
            verbose: verbose
        });

    } catch (e) {
        // if (e && (e.line || e.sourceURL))
            _print("Error on line " + (e.line || "[unknown]") + " of file " + (e.sourceURL || "[unknown]") + ": " + e);
        // throw e;
    }
})(eval);
