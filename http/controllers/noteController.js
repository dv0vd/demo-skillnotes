const fs = require('fs')
const markdownpdf = require("markdown-pdf")

const noteService = require("../../services/noteService");
const requests = require("../../http/requests");
const responses = require("../../http/responses");

async function archiveNote(req, res) {
  const { noteId, archived, success } = requests.archiveNoteRequest(req);

  if (success) {
    const note = await noteService.updateNote(req.user.id, noteId, { is_active: !archived });
    if (!note) {
      return res.status(404).json(`Note with id='${noteId}' not found`);
    }

    return res.status(200).json(responses.note(note));
  } else {
    return res.status(400).json("Validation error");
  }
}

async function createNote(req, res) {
  const { title, description, success } = requests.createNoteRequest(req);

  if (success) {
    const note = await noteService.createNote(req.user.id, title, description);

    return res.status(201).location(`/api/notes/${note.id}`).json(responses.note(note));
  } else {
    return res.status(400).json("Validation error");
  }
}

async function deleteNote(req, res) {
  const { success, noteId } = requests.getNoteRequest(req);

  if (!success) {
    return res.status(400).json("Incorrect id");
  }

  const deletedCount = await noteService.deleteNote(req.user.id, noteId);

  if (!deletedCount) {
    return res.status(404).json(`Note with id='${noteId}' was not found`);
  }

  return res.status(200).json(`Note with id='${noteId}' was successfully deleted`);
}

async function deleteArchivedNotes(req, res) {
  await noteService.deleteArchivedNotes(req.user.id);

  return res.sendStatus(204);
}

async function downloadNote(req, res) {
  const { success, noteId } = requests.getNoteRequest(req);

  if (!success) {
    return res.sendStatus(400);
  }

  const note = await noteService.getNote(req.user.id, noteId);
  if (!note) {
    return res.sendStatus(404);
  }

  const fileName = `${__dirname}/../storage/${noteId}/${note.title}.pdf`;
  try {
    await new Promise((resolve, reject) => {
      markdownpdf({
        paperFormat: "A4",
        paperOrientation: "portrait",
        margin: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        },
      })
        .from.string(note?.description ?? "")
        .to(fileName, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
    });

    return res.download(fileName, (err) => {
      if (err) {
        console.error(`Error downloading note with id='${noteId}':`, err);
      }

      fs.rmSync(`${__dirname}/../storage/${noteId}`, { recursive: true, force: true });
    });
  } catch (err) {
    console.error(`Error generating PDF for note with id='${noteId}':`, err);

    return res.sendStatus(500);
  }
}

async function getNote(req, res) {
  const { success, noteId } = requests.getNoteRequest(req);

  if (!success) {
    return res.status(400).json("Incorrect id");
  }

  const note = await noteService.getNote(req.user.id, noteId);
  if (!note) {
    return res.status(404).json(`Note with id='${noteId}' not found`);
  }

  return res.status(200).json(responses.note(note));
}

async function getNotes(req, res) {
  const { age, page, limit, active, search } = requests.getNotesRequest(req);

  return res
    .status(200)
    .json(
      responses.notes(
        await noteService.getNotes(req.user.id, page, limit, age, active, search),
        page * limit < (await noteService.getNotesCount(req.user.id, age, active)),
        search,
      ),
    );
}

async function updateNote(req, res) {
  const { noteId, title, description, success } = requests.updateNoteRequest(req);

  if (success) {
    const note = await noteService.updateNote(req.user.id, noteId, { title, description });
    if (!note) {
      return res.status(404).json(`Note with id='${noteId}' not found`);
    }

    return res.status(200).json(responses.note(note));
  } else {
    return res.status(400).json("Validation error");
  }
}

module.exports = {
  archiveNote,
  createNote,
  deleteNote,
  deleteArchivedNotes,
  downloadNote,
  getNote,
  getNotes,
  updateNote,
};
