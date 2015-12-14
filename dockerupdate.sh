#!/bin/bash

echo Updating docker container on $1..
ssh $1 'bash -s' < deploymentscript.sh $2
