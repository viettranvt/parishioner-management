#!make

run: 
	go run cmd/server/main.go

build: ## Show build.sh help for building binnary package under cmd
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server/

docker/up: ## Run docker compose
	docker-compose up -d

docker/down: ## Stop docker compose
	docker-compose down

run/deployment: ##run deployment script
	go run ./cmd/deployment/main.go