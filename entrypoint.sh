BASE_PATH="${BASE_PATH:-/}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-dbname}"
DB_USER="${DB_USER:-user}"
DB_PASSWORD="${DB_PASSWORD:-pasword}"
export DB_HOST DB_PORT DB_NAME DB_USER DB_PASSWORD BASE_PATH

envsubst '$$BASE_PATH' < ./utils_env.js > ./utils.js;
envsubst '$$BASE_PATH' < ./views/_layout_env.njk > ./views/_layout.njk;
envsubst '$$BASE_PATH' < ./views/404_env.njk > ./views/404.njk;
envsubst '$$BASE_PATH' < ./frontend-src/api_env.js > ./frontend-src/api.js

npm run build --verbose
npm run migrate

exec npm start
