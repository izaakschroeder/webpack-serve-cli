
var _ = require('lodash');
var Router = require('express/lib/router');
var Proxy = require('http-proxy');
var serveStatic = require('serve-static');

var contentHandlers = {
	'http:': function(url) {
		var proxy = Proxy.createProxy({
			target: url
		});
		return function(req, res) {
			proxy.web(req, res);
		}
	},
	'file:': function(path) {
		return serveStatic(path);
	}
};

module.exports = function(compiler, options) {
	var router = new Router();
	_.forEach(_.map(argv.content, normalizeContent), function(content) {
		router.use(content.base, contentHandlers[content.url](content));
	});
	return router;
}
