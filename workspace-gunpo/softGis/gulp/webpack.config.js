const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)|(vendor)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								useBuiltIns: 'entry',
								corejs: 3
							}]
						]
					}
				}
			}
		]
	},
	plugins: [
		new TerserPlugin({
			extractComments: true
		})
	]
}