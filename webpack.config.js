'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	//Have to add the dev server and hot reloading server
	entry: [
	  'webpack-dev-server/client?http://0.0.0.0:3000',
	  'webpack/hot/only-dev-server',
	  './app/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	resolve: {
    	extensions: ['', '.js', '.jsx']
  	},
	//Tell webpack to use hot reloader on the components
	module: {
		loaders: [{ 
			test: /\.jsx?$/, 
			loaders: ['react-hot', 'babel'], 
			include: path.join(__dirname, 'app') 
		}]
	},
	//Add the got module replacement plugin
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.DefinePlugin({
	      'DEVELOPMENT': true //set it to true in dev mode
	    })
	]
};