const queryLimit = 20;

function getBasePath() {
  return '/demo/skillnotes/';
}

function getKnexConnection() {
  return require('knex')({
    client: 'pg',
    connection: {
      host: process.env.SKILLNOTES_DB_HOST,
      port: process.env.SKILLNOTES_DB_PORT || 5432,
      database: process.env.SKILLNOTES_DB_NAME,
      user: process.env.SKILLNOTES_DB_USER,
      password: process.env.SKILLNOTES_DB_PASSWORD,
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
