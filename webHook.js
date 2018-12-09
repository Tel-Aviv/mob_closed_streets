var express = require('express');
var fetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');

const app = express();
app.use(express.json());

const port = 4567;

app.post('/payload', (req, res) => {
  const headCommit = req.body.head_commit;
  const mofiledFiles = headCommit.modified;
  console.log(`Modified files: ${mofiledFiles}`);

  var headers = {
    Accept: "application/vnd.github.v3+json"
  }
  fetch('https://api.github.com/repos/Tel-Aviv/mob_closed_streets/contents/webHook.js',
        {
          method: 'GET',
          headers: headers,
          agent: new HttpsProxyAgent('http://forticache:8080')
        })
  .then( res => res.json())
  .then( json => {
    console.log(json.content);
    console.log(Buffer.from(json.content, 'base64').toString('ascii'));
  })
  .catch( err => {
    console.error(err);
  });

  res.send('Processed');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
