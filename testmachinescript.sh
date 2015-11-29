#!/bin/bash

docker stop $(docker ps -a -q)
docker pull snaebjorn13/tictactoe
docker run -p 9000:8080 -d -e "NODE_ENV=production" snaebjorn13/tictactoe