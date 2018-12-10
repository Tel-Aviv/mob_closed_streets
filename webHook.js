var express = require('express');
var fetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');
var fs = require('fs');

const BUNDLE_FILE_NAME = 'bundle.js';

const app = express();
app.use(express.json());

const port = 4567;

function _fetch(url) {
  const proxyServer =  process.env.HTTP_PROXY ||
                      'http://forticache:8080';
  return fetch(url, {
      agent: new HttpsProxyAgent(proxyServer)
  });
}

app.post('/payload', (req, res) => {

  const assetsURL = req.body.release.assets_url;
  console.log(`Downloading from ${assetsURL}`);

  _fetch(assetsURL)
  .then( res => res.json())
  .then( json => {
    console.log(`Assets list downloaded`);
    const bundleItem = json.find( item => {
      return item.name == BUNDLE_FILE_NAME
    });
    if( bundleItem ) {
      return _fetch(bundleItem.browser_download_url);
    }
  })
  .then( res => {
    const dest = fs.createWriteStream(BUNDLE_FILE_NAME);
    res.body.pipe(dest);
    console.log(`Successufully saved`);
  })
  .catch(err => {
    console.error(err);
  });

  res.send('Processed');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
