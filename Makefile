build-run: build run

build:
	docker build --build-arg PORT=3000 -t nextjs-sheira .

run:
	docker run -p 3000 -e PORT=3000 nextjs-sheira

.PHONY: build run