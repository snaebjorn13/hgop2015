#!/bin/bash

docker kill tictactoe
docker rm tictactoe
docker pull snaebjorn13/tictactoe:$GIT_PREVIOUS_SUCCESSFUL_COMMIT
docker run --name tictactoe -p $1:8080 -d -e "NODE_ENV=production" snaebjorn13/tictactoe:$GIT_PREVIOUS_SUCCESSFUL_COMMIT
