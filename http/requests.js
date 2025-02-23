const utils = require("../utils");
const uuid = require("uuid");

function archiveNoteRequest(req) {
  let success = true;
  const archived = req?.body?.archived ?? null;
  const noteId = req?.params?.id;

  if (archived === null) {
    success = false;
  }

  if (!uuid.validate(noteId)) {
    success = false;
  }

  return {
    noteId,
    archived,
    success,
  };
}

function createNoteRequest(req) {
  let success = true;
  const title = req?.body?.title ?? "";
  const description = req?.body?.text ?? "";

  if (!title) {
    success = false;
  }

  return {
    title,
    description,
    success,
  };
}

function getNoteRequest(req) {
  let success = true;

  const noteId = req?.params?.id;
  if (!uuid.validate(noteId)) {
    success = false;
  } else [];

  return {
    noteId,
    success,
  };
}

function getNotesRequest(req) {
  const age = req?.query?.age ?? null;
  const page = req?.query?.page ?? 1;
  const limit = req?.query?.limit ?? utils.queryLimit;
  const active = req?.query?.active ?? true;
  const search = req?.query?.search ?? null;

  return {
    age,
    page,
    limit,
    active,
    search,
  };
}

function updateNoteRequest(req) {
  let success = true;
  const title = req?.body?.title ?? "";
  const description = req?.body?.text ?? "";
  const noteId = req?.params?.id;

  if (!title) {
    success = false;
  }

  if (!uuid.validate(noteId)) {
    success = false;
  }

  return {
    noteId,
    title,
    description,
    success,
  };
}

module.exports = {
  archiveNoteRequest,
  createNoteRequest,
  getNoteRequest,
  getNotesRequest,
  updateNoteRequest,
};
