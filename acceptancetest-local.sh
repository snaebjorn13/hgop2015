#!/bin/bash
echo Starting local acceptance test...
export ACCEPTANCE_URL=http://127.0.0.1:9000
grunt mochaTest:acceptance
