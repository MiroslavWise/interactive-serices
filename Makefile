build-run: build run

build:
	docker build --build-arg PORT=$(PORT) -t nextjs-sheira .

run:
	docker run -p $(PORT):$(PORT) -e PORT=$(PORT) nextjs-sheira

.PHONY: build run