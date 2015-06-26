
var morgan = require('morgan');
var InfoWebpackPlugin = require('info-webpack-plugin');

module.exports = function (verbose) {
	verbose = normalizeVerbose(verbose);
	if (verbose.express) {
		app.use(morgan('dev'));
	}
	if (verbose.webpack) {
		var info = new InfoWebpackPlugin();
		info.apply(compiler);
	}
}
