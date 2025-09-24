.DEFAULT_GOAL := help

init:
	podman run \
  --rm \
  -v ./:/app \
  docker.io/node:24.5.0-bookworm \
  sh -c 'cd /app && npm ci --verbose'

env:
	set -a; . ./.env; set +a; \
	envsubst '$$BASE_PATH' < ./utils_env.js > ./utils.js; \
	envsubst '$$BASE_PATH' < ./views/_layout_env.njk > ./views/_layout.njk; \
	envsubst '$$BASE_PATH' < ./views/404_env.njk > ./views/404.njk; \
	envsubst '$$BASE_PATH' < ./frontend-src/api_env.js > ./frontend-src/api.js

build:
	$(MAKE) env
	podman run \
	--rm \
	-v ./:/app \
	docker.io/node:24.5.0-bookworm \
	sh -c 'cd /app && npm run build --verbose'

build-dev:
	$(MAKE) env
	podman run \
  --rm \
  -v ./:/app \
  docker.io/node:24.5.0-bookworm \
  sh -c 'cd /app && npm run build-dev --verbose'

start:
	podman-compose up -d

stop:
	podman-compose down

restart: stop start

GREEN='\033[1;32m'
WHITE='\033[1;37m'
RESET='\033[0m'
help:
	@echo -e ${GREEN}init'             '${WHITE}— initialize the project${RESET}
	@echo -e ${GREEN}env'              '${WHITE}— apply env${RESET}
	@echo -e ${GREEN}build'            '${WHITE}— build the project${RESET}
	@echo -e ${GREEN}build-dev'        '${WHITE}— build the project with in mode \(automatically rebuild on file changes\)${RESET}
	@echo -e ${GREEN}start'            '${WHITE}— start the project${RESET}
	@echo -e ${GREEN}stop'             '${WHITE}— stop the project${RESET}
	@echo -e ${GREEN}restart'          '${WHITE}— restart the project${RESET}
