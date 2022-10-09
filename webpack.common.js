/**
 * This file is adapted from Blockly Samples
 * https://github.com/google/blockly-samples/tree/master/examples/blockly-webpack
 * original license below
 *
 * original author samelh@google.com (Sam El-Husseini)
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	name: 'webapp',
	target: 'web',
	entry: {
		webapp: {
			import: './src/webapp.js',
			dependOn: ['blockly', 'blockSheets'],
			filename: 'index.js',
		},
		// appscript frontend is served from the gh-pages
		appscript: {
			import: './src/appscript/appscript.js',
			dependOn: ['blockly', 'blockSheets'],
			filename: 'appscript.js',
		},
		blockly: {
			import: './src/blockly.js',
			filename: 'blockly.js',
		},
		blockSheets: {
			import: './src/blockSheets/index.js',
			filename: 'blockSheets.js',
			dependOn: 'blockly',
		},
	},
	optimization: {
		// due to multiple entrypoints on a page https://bundlers.tooling.report/code-splitting/multi-entry/ see "webpack"
		runtimeChunk: 'single',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	resolve: {
		alias: {
			// 'blockly' is a kitchen sink module that we don't want
			// use our minimal import instead
			blockly$: path.resolve(__dirname, "./src/blockly.js"),

			googleAPI: path.resolve(__dirname, 'src/appscript/googleAPI.js'),
		},
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public/style.css'),
					to: path.resolve(__dirname, 'build/style.css')
				},
				{
					// Copy over media resources from the Blockly package
					from: path.resolve(__dirname, './node_modules/blockly/media'),
					to: path.resolve(__dirname, 'build/media')
				},
			]
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/webapp.html'),
			filename: path.resolve(__dirname, 'build/index.html'),
			chunks: ['blockly', 'blockSheets', 'webapp'],
		}),
	],
};
