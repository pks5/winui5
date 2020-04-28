#!/bin/bash

echo ' _      ___      __  ___ ____'
echo '| | /| / (_)__  / / / (_) __/'
echo '| |/ |/ / / _ \/ /_/ / /__ \ ' 
echo '|__/|__/_/_//_/\____/_/____/ ' 

echo

curDir=$(pwd)

echo Welcome to WinUi5 update.

echo

echo Updating node modules for /bin ...

cd "$(dirname "$0")"

npm update

echo

echo Updating node modules for /server ...

cd ../server

npm update

echo

echo Updating node modules for /build ...

cd ../build/pks.winui5

npm update

cd ../pks.winui5.demo

npm update

cd $curDir

echo

read -p "Finished. Press any key to continue or wait 10 seconds ..." -t 10
