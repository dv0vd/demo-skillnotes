const noteRepository = require('../repositories/postgres/noteRepository')

async function createNote(userId, title, description) {
  return await noteRepository.createNote(userId, title, description)
}

async function createDemoNote(userId) {
  const description = '# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n\n***\n\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n\n---\n\n\n## Blockquotes\n\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n\n## Lists\n\n### Unordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n\n### Ordered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n\n## Code\n\n### Inline \n`code`\n\n### Indented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\n\n### Block code \"fences\"\n\n```\nSample text here...\n```\n\n### Syntax highlighting\n\n``` js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n\n## Links\n\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ \"title text!\")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg "The Dojocat" \n'

  return await createNote(userId, 'Demo', description)
}

async function deleteArchivedNotes(userId) {
  return await noteRepository.deleteArchivedNotes(userId)
}

async function deleteNote(userId, noteId) {
  return await noteRepository.deleteNote(userId, noteId)
}

async function getNote(userId, id) {
  const [ note ] = await noteRepository.getNote(userId, id);

  return note
}

async function getNotes(userId, page, limit, age = null, active = true, search = null) {
  return await noteRepository.getNotes(userId, page, limit, age, active, search)
}

async function getNotesCount(userId, age = null, active = true) {
  const [ result ]= await noteRepository.getNotesCount(userId, age, active)

  return result?.count ?? 0;
}

async function updateNote(userId, noteId, fields) {
  const [ note ] = await noteRepository.updateNote(userId, noteId, fields)

  return note;
}

module.exports = {
  createNote,
  createDemoNote,
  deleteArchivedNotes,
  deleteNote,
  getNote,
  getNotes,
  getNotesCount,
  updateNote,
};
