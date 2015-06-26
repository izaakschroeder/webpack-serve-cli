
var _ = require('lodash');

function normalizeVerbose(v) {
	if (_.isBoolean(v)) {
		return v ? [ 'webpack', 'express' ] : [ ]
	} else if (_.isString(v)) {
		return v.split(',');
	} else {
		return [ ];
	}
}

function normalizeListen(l) {
	if (_.isNumber(l)) {
		return [ l, 'localhost' ];
	} else if (_.isString(l)) {
		var parts = l.split(':');
		return [ parseInt(parts[1], 10), parts[0] ];
	} else {
		return [ 8080, 'localhost' ];
	}
}

function normalizeContent(c) {
	if ()
}

module.exports = {
	normalizeVerbose: normalizeVerbose,
	normalizeListen: normalizeListen,
	normalizeContent: normalizeContent
};
