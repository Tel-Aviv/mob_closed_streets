# mob_closed_streets
[![Build Status](https://travis-ci.org/Tel-Aviv/mob_closed_streets.svg?branch=master)](https://travis-ci.org/Tel-Aviv/mob_closed_streets) 

## How to build/run
1. Clone the repo and setup the project: <code>yarn install</code>
2. run <code>yarn build</code> to build the self-containing bundle
3. Copy produced <code>bundle.js</code> from <code>dist</code> folder to destination server/directory
4. There is a configuration file <code>.env</code> that not deployed to this repo because security reasons. Before next step, create such a file with a content following this structure:
```
user=xxx
password=xxx
server=xxx
database=xxx
```
4. Run <code>node bundle.js</code> from destination server

## CI
This repo provides the definition of WebHook that sends <code>POST</code> requiests for pushes to this repo. In order to receive these request 
1. Expose the destination server to the Internet with <code>ngrok</code>. The [configuration](https://ngrok.com/docs) of ngrok (<code>ngrok.yml</code>) should include the following:
```
authtoken: 2Fg2B5a5Dc616WfLkUX7k_7DRG44FJsq6XHpznf1axo
http_proxy: "http://c1306948:Dfnc94^*7@forticache:8080"
tunnels:
 mob_closed_streets:
  proto: http
  addr: 4567
```
2. After running <code>ngrok start mob_closed_streets</code>, you may change [Payload URL](https://github.com/Tel-Aviv/mob_closed_streets/settings/hooks/67810412) with newly address generated by ngrok. Be sure to preserve the specified port: 4567.
3. Now run <code>node webHook.js</code>.

