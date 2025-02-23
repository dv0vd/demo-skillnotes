const { getKnexConnection } = require("../../utils");

require("dotenv").config();

const knex = getKnexConnection();

async function createNote(userId, title, description) {
  const [note] = await knex("notes")
    .insert({
      title,
      description,
      user_id: userId,
    })
    .returning("*");

  return note;
}

async function deleteArchivedNotes(userId) {
  const deletedCount = await knex("notes")
    .where({
      user_id: userId,
      is_active: false,
    }).delete();

  return deletedCount;
}

async function deleteNote(userId, noteId) {
  const deletedCount = await knex("notes")
    .where({
      user_id: userId,
      id: noteId,
    }).delete();

  return deletedCount;
}

async function getNote(userId, id) {
  const query = knex("notes")
    .where({
      user_id: userId,
      id,
    })

  return await query;
}

async function getNotes(userId, page, limit, age = null, active = true, search = null) {
  const query = knex("notes")
    .where({
      user_id: userId,
      is_active: active,
    })
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy("created_at", "desc");

  if (age) {
    const date = new Date();
    date.setDate(date.getDate() - age);

    query.where("created_at", ">=", date.toISOString());
  }
  if (search) {
    query.whereILike('title', `%${search}%`)
  }

  return await query;
}

async function getNotesCount(userId, age = null, active = true) {
  const query = knex("notes")
    .where({
      user_id: userId,
      is_active: active,
    })
    .count();

  if (age) {
    const date = new Date();
    date.setDate(date.getDate() - age);

    query.where("created_at", ">=", date.toISOString());
  }

  return await query;
}

async function updateNote(userId, noteId, fields) {
  if (!Object.entries(fields).length) {
    return [ null ]
  }

  const note = await knex("notes")
    .update(fields)
    .where({
      user_id: userId,
      id: noteId,
    })
    .returning("*");

  return note;
}

module.exports = {
  createNote,
  deleteArchivedNotes,
  deleteNote,
  getNote,
  getNotes,
  getNotesCount,
  updateNote,
};
