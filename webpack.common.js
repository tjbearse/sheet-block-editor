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

module.exports = [
{
	name: 'webapp',
	target: 'web',
	entry: {
		generator: './src/generator.js',
	},
	output: {
		path: path.resolve(__dirname, 'build/webapp'),
		filename: '[name].js'
	},
	resolve: {
		alias: {
			// 'blockly' is a kitchen sink module that we don't want
			// use our minimal import instead
			blockly$: path.resolve(__dirname, "./src/blockly.js"),
		},
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public/generator.html'),
					to: path.resolve(__dirname, 'build/webapp/index.html')
				},
				{
					// Copy over media resources from the Blockly package
					from: path.resolve(__dirname, './node_modules/blockly/media'),
					to: path.resolve(__dirname, 'build/webapp/media')
				}
			]
		})
	],
}, {
	name: 'googleapp',
	target: 'web',
	entry: {
		appscript: './src/appscript/appscript.js',
	},
	output: {
		path: path.resolve(__dirname, 'build/appscript'),
		filename: '[name].js'
	},
	resolve: {
		alias: {
			// 'blockly' is a kitchen sink module that we don't want
			// use our minimal import instead
			blockly$: path.resolve(__dirname, "./src/blockly.js"),
		},
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public/appscript.html'),
					to: path.resolve(__dirname, 'build/appscript/index.html')
				},
				{
					// Copy over media resources from the Blockly package
					from: path.resolve(__dirname, './node_modules/blockly/media'),
					to: path.resolve(__dirname, 'build/appscript/media')
				}
			]
		}),
	],
}
];
