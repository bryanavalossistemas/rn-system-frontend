const URI = "http://localhost:4000/api/";

const get = async (endpoint) => {
  return await fetch(URI + endpoint)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getWithToken = async (endpoint, authToken) => {
  return await fetch(URI + endpoint, {
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const post = async (endpoint, payload) => {
  const postPayload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  return await fetch(URI + endpoint, postPayload)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const postFormData = async (endpoint, formData) => {
  const postPayload = {
    method: "POST",
    body: formData,
  };

  return await fetch(URI + endpoint, postPayload)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const put = async (endpoint, payload) => {
  const postPayload = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  return await fetch(URI + endpoint, postPayload)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const putFormData = async (endpoint, formData) => {
  const postPayload = {
    method: "PUT",
    body: formData,
  };

  return await fetch(URI + endpoint, postPayload)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const remove = async (endpoint) => {
  const postPayload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetch(URI + endpoint, postPayload)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const base = {
  get,
  post,
  put,
  remove,
  getWithToken,
  postFormData,
  putFormData,
};

export default base;
