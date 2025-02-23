const basePath = '';

export const getNotes = ({ age, search, page } = {}) => {
  age = age ?? null;
  let archived = false;

  switch (age) {
    case '1month':
      age = 30;
      break;
    case '3months':
      age = 90;
      break;
    case 'archive':
      archived = true;
      break;
    default:
      break;
  }

  const params = new URLSearchParams();
  params.append("page", page ?? 1);

  if (age && !(age == 'alltime' || age == 'archive')) {
    params.append("age", age);
  }

  if (archived) {
    params.append("active", false);
  }

  if (search) {
    params.append("search", search);
  }

  return fetch(`${basePath}/api/notes?${params}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const createNote = (title, text) => {
  return fetch(`${basePath}/api/notes`, {
    method: 'POST',
    body: JSON.stringify({ title, text }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const getNote = (id) => {
  return fetch(`${basePath}/api/notes/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const archiveNote = (id) => {
  return fetch(`${basePath}/api/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ archived: true }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const unarchiveNote = (id) => {
  return fetch(`${basePath}/api/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ archived: false }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const editNote = (id, title, text) => {
  return fetch(`${basePath}/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, text }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const deleteNote = (id) => {
  return fetch(`${basePath}/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const deleteAllArchived = () => {
  return fetch(`${basePath}/api/notes`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.ok
      ? ''
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const notePdfUrl = (id) => {
  return `${basePath}/download/${id}`;
};
