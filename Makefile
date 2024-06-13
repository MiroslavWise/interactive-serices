pull:
	git checkout develop
	git pull

git:
	npm run t:minify
	git add .
	git status
	git commit -m "$(c)"
	git status
	git push