import webpack from 'webpack';
const path = require('path');

function build() {

  const compiler = webpack({
    target: 'node',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: 'bundle.js'
    },
    mode: 'production'
  });

  compiler.run((err, stats) => {
    if( err || stats.hasErrors() ) {
      console.error(err);
    } else {
      console.log(stats.toString({
            chunks: false,  // Makes the build much quieter
            colors: true    // Shows colors in the console
      }));
    }
  });

}

export default build;
