# Skillnotes

## Live demo: https://dv0vd.dev/demo/skillnotes 
## Podman/Docker image: https://hub.docker.com/r/dv0vd/demo-skillnotes

A note management website developed using Node.js, Express, and the service-repository pattern.

## Getting started

### Podman Compose (includes a built-in database)
1) Configure the `.env` file.
2) Run the command `make init`.
2) Run the command `make build`.
3) Start the project with: `make start`.
4) To stop or restart the project, use `make stop` and `make restart`, respectively.

### Podman image (use your own MongoDB)
Run the container with your Postgres:
```
podman run \
	-d \
	-e DB_HOST=<your-postgres-host> \
	-e DB_PORT=<your-postgres-port> \
	-e DB_USER=<your-postgres-user> \
	-e DB_PASSWORD=<your-postgres-password> \
	-e DB_NAME=<database-name> \
	-e BASE_PATH='/' \
	--name demo-skillnotes \
	--restart unless-stopped \
	--memory=128M \
	--cpus=0.25  \
	docker.io/dv0vd/demo-skillnotes
```

