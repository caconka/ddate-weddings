#!/bin/bash
echo "Copy files to public..."
cd client
ng build --env=prod
cd ..
rm -rf ./server/public
mkdir ./server/public
mkdir ./server/public/uploads
cp -r ./client/dist/ ./server/public
echo "Done!!"
