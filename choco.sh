#!/bin/bash
cd ../chocolate-ui
rm -rf dist/
yarn build
yarn bundle
cp dist/* ../knowledge-base/public
cd ../knowledge-base/public
rm ./chocolate-ui.*
mv ./chocolate-ui*.js ./chocolate-ui.js
mv ./chocolate-ui*.css ./chocolate-ui.css
