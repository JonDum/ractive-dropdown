var webpack = require('webpack');

module.exports = {
	entry: 'src/ractive-dropdown',
	output: {
		path: __dirname + '/',
		filename: 'ractive-dropdown.js',
		library: 'RactiveDropdown',
		libraryTarget: 'umd',
		pathinfo: true,
	},
	resolve: {
		root: process.cwd(),
		modulesDirectories: ['node_modules', 'src'],
		extensions: ['', '.js', '.styl', '.html'],
	},
	module: {
		loaders: [
			{test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
			{test: /\.html/, loader: 'ractive-loader'}
		],
	},
}
