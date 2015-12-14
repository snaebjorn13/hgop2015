#!/bin/bash

echo Cleaning...
rm -rf ./dist

if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

echo Building app
export MOCHA_REPORTER=xunit
export MOCHA_REPORT=test-reports/mocha/server-tests.xml
grunt
rc=$?; if [[ $rc != 0 ]]; then
	echo "Grunt failed with exit code " $rc
	exit $rc
fi

cat > ./dist/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

cat > ./dist/public/version.html << _EOF_
<!doctype html>
<head>
   <title>TicTacToe version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

cp ./Dockerfile ./dist/

cd dist
npm install --production
rc=$?; if [[ $rc != 0 ]]; then
	echo "NPM install failed with exit code " $rc
	exit $rc
fi

echo Building docker image
docker build -t snaebjorn13/tictactoe:$GIT_COMMIT .
rc=$?; if [[ $rc != 0 ]]; then
	echo "Docker build failed with exit code " $rc
	exit $rc
fi

echo git commit is $GIT_COMMIT

echo Pushing image..
docker push snaebjorn13/tictactoe:$GIT_COMMIT
rc=$?; if [[ $rc != 0 ]]; then
	echo "Docker push failed with exit code " $rc
	exit $rc
fi

echo "Done"
