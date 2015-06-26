#!/usr/bin/env node

// Core
var _ = require('lodash');
var open = require('open');
var yargs = require('yargs');
var path = require('path');
var serve = require('webpack-serve');
var http = require('http');
var express = require('express');

// Plugins
var browse = require('../lib/browse');
var content = require('../lib/content');
var fs = require('../lib/fs');
var hot = require('../lib/hot');
var logging = ;

var argv = yargs
	.usage('Usage: $0 [options] webpack.config.js')
	.options({
		hot: {
			describe: 'Enable hot module reloading',
			alias: 'x',
			default: true
		},
		listen: {
			describe: 'Listen address',
			alias: 'l',
			default: 'localhost:8080'
		},
		verbose: {
			describe: 'Output various information to console',
			alias: 'v',
			default: 'webpack,express'
		},
		browse: {
			describe: 'Enable browsing the generated webpack files',
			alias: 'b',
			default: '/files'
		},
		fs: {
			describe: 'Use `memory-fs` instead of `fs`',
			alias: 'F',
			default: 'memory-fs'
		},
		config: {
			describe: 'webpack configuration files',
			default: [ 'webpack.config.js' ],
			alias: 'c',
			array: true
		},
		content: {
			describe: 'Serve additional content',
			default: [ ],
			array: true
		}
	})
	.wrap(yargs.terminalWidth() - 2)
	.help('help')
	.argv;


// Load all the webpack configuration files specified on the CLI, flattening
// everything into an array of webpack configs.
var configs = _.chain(argv.config)
	.map(function(file) {
		return path.resolve(process.cwd(), file);
	})
	.map(function(file) {
		return require(file)
	})
	.flatten()
	.value();

// Express.
var app = express();
var server = http.createServer(app);

// Base webpack support. Avoid multicompiler when possible.
var compiler = webpack(configs.length > 1 ? configs : configs[0]);
var middleware = serve(compiler);

_.forEach([
	'fs', // memory-fs support.
	'browse', // File system browsing.
	'logging', //Logging.
	'hot', // Hot module reloading.
	'content', // Serve additional content.
], function(name) {
	var plug = require(path.join('..', 'lib', name));
	plug(compiler, argv);
});

// Watch.
compiler.watch();

// Listen.
var listen = normalizeListen(argv.listen);
server.listen(listen[0], listen[1], function() {
	open('http://' + argv.listen);
});
