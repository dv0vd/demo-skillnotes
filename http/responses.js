function note(note, search = null) {
  const showdown = require("showdown");
  const converter = new showdown.Converter();

  const result = {
    _id: note?.id ?? null,
    title: note?.title ?? "",
    text: note?.description ?? "",
    html: converter.makeHtml(note?.description ?? "") ?? "",
    created: note?.created_at,
    isArchived: !note?.is_active ?? false,
  };

  if (search) {
    const regex = new RegExp(search, "ig");

    result.highlights = result.title.replace(regex, (match) => {
      return `<mark>${match}</mark>`
    });

  }

  return result;
}

function notes(notes, hasMore, search = null) {
  const response = {};

  notes = notes.map((item) => {
    return note(item, search);
  });

  response.data = [...notes];

  response.hasMore = hasMore;

  return response;
}

module.exports = {
  note,
  notes,
};
