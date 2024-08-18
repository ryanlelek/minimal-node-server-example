# minimal-node-server-example

Proof of concept only, you probably should ignore this repo

## Usage

- Run `npm install`
- Run `npm start`

## Cloud Machine

- Create a Debian 12 VM
- `apt-get install -y git`
- `git clone https://github.com/ryanlelek/minimal-node-server-example`
- Run `bash ./minimal-node-server-example/scripts/debian_12.sh` as root from `/root`
- Machine will reboot
- Edit the endpoints below with your Cloud Machine IP instead of `localhost`

## Endpoint Examples

```bash

# Plain Endpoint
curl -v http://localhost:8085/;
curl -v http://localhost:8085/?query=string;
curl -v -X POST -H "Content-Type: application/json" -d '{"some":"data"}' http://localhost:8085/;
curl -v -X POST -H "Content-Type: application/json" -d '{"some":"data"}' http://localhost:8085/?query=string;
curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "some=data" http://localhost:8085/;

# Others
# Replace above URI with below
#
# JSON body parser middleware only
# http://localhost:8085/bodyparser-json
#
# URL Encoded body parser middleware only
# http://localhost:8085/bodyparser-urlencoded
#
# Both JSON and URL Encoded body parser middleware
# http://localhost:8085/bodyparser-both
#
# Both JSON and URL Encoded body parser middleware and helmet middleware without CSP
# http://localhost:8085/bodyparser-both-helmet
```
