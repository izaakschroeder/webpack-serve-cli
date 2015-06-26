
var _ = require('lodash');
var Router = require('express/lib/router');
var serveIndex = require('serve-index');

module.exports = function() {
	var browser = new express.Router();
	var compilers = compiler.compilers ? compiler.compilers : [ compiler ];
	_.forEach(compilers, function(compiler) {
		browser.use(
			compiler.options.output.publicPath,
			serveIndex(compiler.options.output.path, {
				fs: compiler.outputFileSystem
			})
		);
	});
	app.use('/files', browser);
}
