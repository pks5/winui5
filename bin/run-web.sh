#!/bin/bash

echo ' _      ___      __  ___ ____'
echo '| | /| / (_)__  / / / (_) __/'
echo '| |/ |/ / / _ \/ /_/ / /__ \ ' 
echo '|__/|__/_/_//_/\____/_/____/ ' 

echo

curDir=$(pwd)

echo Starting http server ...

cd "$(dirname "$0")"

npm run run-web -- $1

cd $curDir

echo 

read -p "Finished. Press any key to continue or wait 10 seconds ..." -t 10
