
var MemoryFileSystem = require('memory-fs');
var fs = require('fs');

module.exports = function(compiler, options) {
	if (options.fs === 'memory-fs') {
		compiler.outputFileSystem = new MemoryFileSystem();
	}
}
