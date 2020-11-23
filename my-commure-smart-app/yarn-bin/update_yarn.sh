#!/bin/bash -e

# update to latest yarn version

LATEST_VERSION=$(yarn info yarn --json | jq .data.version | tr -d '"')
echo "latest yarn version is $LATEST_VERSION, fetching"
$(curl -L -o yarn.js https://github.com/yarnpkg/yarn/releases/download/v$LATEST_VERSION/yarn-$LATEST_VERSION.js)
