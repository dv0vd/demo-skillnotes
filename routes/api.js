const express = require("express");
require("express-group-routes");

const router = express.Router();
const noteController = require("../http/controllers/noteController");
const userService = require("../services/userService");

router.group("/api/notes", (router) => {
  router
    .route("/")
    .get(userService.authApi, noteController.getNotes)
    .post(userService.authApi, noteController.createNote)
    .delete(userService.authApi, noteController.deleteArchivedNotes);

  router.get('/:id', userService.authApi, noteController.getNote);

  router.put('/:id', userService.authApi, noteController.updateNote);

  router.patch('/:id', userService.authApi, noteController.archiveNote);

  router.delete('/:id', userService.authApi, noteController.deleteNote);
});

module.exports = router;
