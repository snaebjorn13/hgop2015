#!/bin/bash

echo Pushing image..
docker push snaebjorn13/tictactoe

echo Updating docker container on $1..
ssh $1 'bash -s' < testmachinescript.sh