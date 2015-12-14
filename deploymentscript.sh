#!/bin/bash

docker kill tictactoe$1
docker rm tictactoe$1
docker pull snaebjorn13/tictactoe:$GIT_PREVIOUS_SUCCESSFUL_COMMIT
docker run --name tictactoe$1 -p $1:8080 -d -e "NODE_ENV=production" snaebjorn13/tictactoe:$GIT_PREVIOUS_SUCCESSFUL_COMMIT
