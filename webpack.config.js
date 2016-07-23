var webpack = require("webpack");

module.exports = {
    context: __dirname + "/src",
    entry: "./index.js",
    output: {
        path: __dirname,
        publicPath: '/',
	    filename: "bundle.js"
    },
    module: {
        loaders: [
 	    { test: /\.js?$/, loader: "babel"},	    
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
