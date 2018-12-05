# mob_closed_streets

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
