.DEFAULT_GOAL := help

init:
	podman run \
  --rm \
  -v ./:/app \
  docker.io/node:24.5.0-alpine \
  sh -c 'cd /app && npm ci --verbose'

build:
	podman run \
  --rm \
  -v ./:/app \
  docker.io/node:24.5.0-alpine \
  sh -c 'cd /app && npm run build --verbose'

build-dev:
	podman run \
  --rm \
  -v ./:/app \
  docker.io/node:24.5.0-alpine \
  sh -c 'cd /app && npm run build-dev --verbose'

start:
	podman-compose up -d

start-app:
	podman-compose up -d app

stop:
	podman-compose down

restart: stop start

GREEN='\033[1;32m'
WHITE='\033[1;37m'
RESET='\033[0m'
help:
	@echo -e ${GREEN}init'             '${WHITE}— initialize the project${RESET}
	@echo -e ${GREEN}build'            '${WHITE}— build the project${RESET}
	@echo -e ${GREEN}build-dev'        '${WHITE}— build the project with in mode \(automatically rebuild on file changes\)${RESET}
	@echo -e ${GREEN}start'            '${WHITE}— start the project${RESET}
	@echo -e ${GREEN}start-app'        '${WHITE}— start the project without a database${RESET}
	@echo -e ${GREEN}stop'             '${WHITE}— stop the project${RESET}
	@echo -e ${GREEN}restart'          '${WHITE}— restart the project${RESET}
