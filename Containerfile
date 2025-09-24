FROM docker.io/node:24.5.0-bookworm

COPY ./ /app

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends gettext && \
    rm -rf /var/lib/apt/lists/*

RUN npm ci --verbose

ENTRYPOINT ["sh", "entrypoint.sh"]
