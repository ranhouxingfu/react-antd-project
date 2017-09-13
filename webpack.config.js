var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname + '/src/client/build',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
				test: /\.js|.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					plugins: [
						["import", { "libraryName": "antd" }]
					],
					presets: ['es2015', 'react', 'stage-2']
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=1024'
			},
			{
				test: /\.(html|tpl)$/,
				loader: 'html-loader'
			}
		]
	},
	resolve: {
		alias: {
			'$': 'jquery'
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jQuery',
			"React": "react"
		}),
		new ExtractTextPlugin('main.css'),
		new CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js'
		})
	],
//		externals: [nodeExternals()], //不把node_modules中的文件打包
}