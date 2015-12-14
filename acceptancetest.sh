#!/bin/bash
echo Restarting docker image..
ssh vagrant@192.168.33.10 'docker restart tictactoe'
export ACCEPTANCE_URL=http://192.168.33.10:9000
export MOCHA_REPORTER=xunit
export MOCHA_REPORT=test-reports/mocha/server-tests.xml
grunt mochaTest:acceptance
