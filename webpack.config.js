var webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: __dirname + "dist",
        publicPath: 'assets/',
	    filename: "bundle.js"
    },
    module: {
        loaders: [
 	    { test: /\.js?$/, loader: "babel",exclude: /node_modules/},	    
	    { test: /\.css$/, loader: "style-loader!css-loader" },
	    { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
	]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
}
