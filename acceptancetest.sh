#!/bin/bash
# This script is just for convenience when running acceptance test manually
ssh vagrant@192.168.33.10 'docker restart tictactoe'
export ACCEPTANCE_URL=http://192.168.33.10:9000
grunt mochaTest:acceptance
