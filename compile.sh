rm -rf .history
rm -rf .rollup.cache
rm -rf dist

yarn rollup

git add .
git commit -m  "Push command from compile"
git push origin main

npm publish
