#!/bin/bash

docker kill tictactoe
docker rm tictactoe
docker pull snaebjorn13/tictactoe
docker run --name tictactoe -p 9000:8080 -d -e "NODE_ENV=production" snaebjorn13/tictactoe