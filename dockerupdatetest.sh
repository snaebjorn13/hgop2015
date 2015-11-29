#!/bin/bash

echo Pushing image..
docker push snaebjorn13/tictactoe

echo Updating docker container on test machine..
ssh vagrant@192.168.33.10 'bash -s' < testmachinescript.sh