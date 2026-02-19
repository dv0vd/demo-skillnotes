const queryLimit = 20;

function getBasePath() {
  return process.env.BASE_PATH || '/';
}

function getKnexConnection() {
  return require('knex')({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  })

}

function getSIDCookieName() {
  return 'SID_skillnotes';
}

module.exports = {
  queryLimit,
  getBasePath,
  getKnexConnection,
  getSIDCookieName,
}
