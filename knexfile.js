require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'pg',
  connection: {
    host: process.env.SKILLNOTES_DB_HOST,
    port: process.env.SKILLNOTES_DB_PORT || 5432,
    database: process.env.SKILLNOTES_DB_NAME,
    user: process.env.SKILLNOTES_DB_USER,
    password: process.env.SKILLNOTES_DB_PASSWORD,
  },
  migrations: {
    tableName: 'migrations',
  }
};
