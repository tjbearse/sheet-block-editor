const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

const update = {
	mode: 'production',

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/appscript/index.html'),
			filename: path.resolve(__dirname, 'build/appscript/index.html'),
			inject: 'body',
			publicPath: 'https://tjbearse.github.io/sheet-block-editor',
			chunks: ['blockly', 'blockSheets', 'appscript'],
			base: 'https://tjbearse.github.io/sheet-block-editor/',
		}),
	]
};
module.exports = merge(common, update);
