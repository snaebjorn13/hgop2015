#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
export MOCHA_REPORTER=xunit
export MOCHA_REPORT=server-tests.xml
grunt
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

echo Building docker image
docker build -t snaebjorn13/tictactoe .
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

echo Pushing image..
docker push snaebjorn13/tictactoe
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

echo "Done"
