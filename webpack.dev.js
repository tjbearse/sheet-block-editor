const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

const update = {
	mode: 'development',
	devServer: {
		port: 3000,
	},
	resolve: {
		alias: {
			'googleAPI': path.resolve(__dirname, 'src/appscript/mockGoogleAPI.js'),
		},
	},
	plugins: [
		// add in Appscript for mock testing
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/appscript/test.html'),
					to: path.resolve(__dirname, 'build/appscript/test.html')
				},
			]
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/appscript/index.html'),
			filename: path.resolve(__dirname, 'build/appscript/index.html'),
			inject: 'body',
			// publicPath: 'https://tjbearse.github.io/sheet-block-editor',
			chunks: ['blockly', 'blockSheets', 'appscript'],
			publicPath: '/',
			base: '/',
		}),
	],
}

module.exports = merge(common, update);
