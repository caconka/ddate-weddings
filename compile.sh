#!/bin/bash
cd client
echo 'Building client...'
ng build -e prod
cd ..
echo "Copy files to public..."
rm -rf ./server/public
mkdir ./server/public
mkdir ./server/public/uploads
cp -r ./client/dist/* ./server/public
echo "Git..."
git add .
git commit -m "compiling"
git subtree push --prefix=server heroku master
echo "Done!!"
