import webpack from 'webpack';
const path = require('path');
// import build from '../src/buildBundle.js';

describe('Bundle', () => {

  beforeEach(() => {
    jest.setTimeout(20000);
  });

  test('Build bundle', done => {

    const compiler = webpack({
      target: 'node',
      entry: path.resolve(__dirname, '../src/index.js'),
      output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'bundle.js'
      },
      mode: 'production'
    });

    expect(compiler).not.toBeNull();

    function callback(err, stats) {

      if( err || stats.hasErrors() ) {
        console.error(err);
      } else {
        console.log(stats.toString({
              chunks: false,  // Makes the build much quieter
              colors: true    // Shows colors in the console
        }));
      }

      done();
    }

    compiler.run(callback);

  })

})
