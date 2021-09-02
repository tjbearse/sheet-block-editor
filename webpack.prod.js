const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

const update = {
	mode: 'production',
};
// common is an array of configs
module.exports = common.map(x => merge(x, update));
