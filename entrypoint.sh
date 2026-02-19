HOST="${HOST:-localhost}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-dbname}"
DB_USER="${DB_USER:-user}"
DB_PASSWORD="${DB_PASSWORD:-pasword}"
export DB_HOST DB_PORT DB_NAME DB_USER DB_PASSWORD BASE_PATH

npm run migrate

exec npm start
