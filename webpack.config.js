const path = require('path');
//const nodeExternals = require('webpack-node-externals');

var config = {
  target: 'node',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
//  externals: [nodeExternals()]
}

module.exports = config;
