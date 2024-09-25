const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "2158ef07-a2c5-4086-85af-98881d758f3d",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const newUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

export const createNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};

export const deleteDataCard = (id) => {
  return fetch(`${config.baseUrl}/cards/` + id, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/` + id, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/` + id, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(handleResponse);
};

export const checkAvatarSource = (link) => {
  return fetch(link, {
    method: "HEAD",
  })
    .then((res) => {
      const mime = res.headers.get("Content-Type");
      if (res.ok && mime && (mime === "image/png" || mime === "image/jpeg")) {
      } else {
        return Promise.reject("Ссылка невалидна");
      }
    })
    .catch(() => {
      return Promise.reject("Ссылка невалидна");
    });
};
