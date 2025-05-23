rm -rf .history
rm -rf .rollup.cache
rm -rf dist

yarn rollup

npm version patch

git add .
git commit -m  "Push command from compile"
git push origin main

npm publish
