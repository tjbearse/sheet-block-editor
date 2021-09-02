const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

const update = {
	mode: 'development',
	devServer: {
		port: 3000,
	}
};
// common is an array of configs
module.exports = common.map(x => merge(x, update));
