rm -rf .history
rm -rf .rollup.cache
rm -rf dist

yarn rollup

git add .
git commit -m  "Push command from compile"

npm version patch

git push origin main
git push spring-origin main

npm publish
