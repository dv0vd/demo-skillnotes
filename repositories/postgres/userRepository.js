const { getKnexConnection } = require('../../utils');

require('dotenv').config()

const knex = getKnexConnection()

module.exports = {
  createSession: async function (userId) {
    const [session] = await knex('sessions').insert({ user_id: userId }).returning('id')

    return session.id;
  },

  createUser: async function (username, password) {
    const [user] = await knex('users').insert({ username, password }).returning('*');

    return user;
  },

  deleteSession: async function (id) {
    return await knex('sessions').where({ id }).delete();
  },

  getUserById: async function (id) {
    const [user] = await knex('users').where({ id });

    return user;
  },

  getUserByUsername: async function (username) {
    const [user] = await knex('users').where({ username }).limit(1);

    return user
  },

  getUserIdBySessionId: async function (sessionId) {
    const [session] = await knex('sessions').where({ id: sessionId }).returning('user_id');

    return session?.user_id
  },
};
