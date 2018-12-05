const path = require('path');
const nodeExternals = require('webpack-node-externals');

var config = {
  target: 'node',
  entry: [
    path.resolve(__dirname, './index.js')
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'bundle.js'
  },
  externals: [nodeExternals()]
}

module.exports = config;
