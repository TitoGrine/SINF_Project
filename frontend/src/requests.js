export const getToken = async (method, url, data) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { "Content-Type": "application/json" } : {},
  });
  if (response.status >= 400) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const sendRequest = async (method, url, data, token) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data
      ? { "Content-Type": "application/json", Authorization: token }
      : { Authorization: token },
  });
  if (response.status >= 400) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const getData = async (method, url, token) => {
  const response = await fetch(url, {
    method: method,
    headers: { Authorization: token },
  });
  if (response.status >= 400) {
    throw new Error(response.status);
  }
  return await response.json();
};
