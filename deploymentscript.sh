#!/bin/bash

echo Updating to $2, running on port $1

docker kill tictactoe$1
docker rm tictactoe$1
docker pull snaebjorn13/tictactoe:$2
docker run --name tictactoe$1 -p $1:8080 -d -e "NODE_ENV=production" snaebjorn13/tictactoe:$2
