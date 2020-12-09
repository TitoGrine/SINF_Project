export const getToken = async (method, url, data) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { "Content-Type": "application/json" } : {},
  });
  if (response.status >= 400) {
    return response.json().then((errorMessage) => {
      const error = new Error(errorMessage);
      throw error;
    });
  }
  return await response.json();
};

export const sendRequest = async (method, url, data) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { "Content-Type": "application/json" } : {},
  });
  if (response.status >= 400) {
    return response.json().then((errorMessage) => {
      const error = new Error(errorMessage);
      throw error;
    });
  }
  return await response.json();
};


export const getData = async (method, url, token) => {
  const response = await fetch(url, {
    method: method,
    headers: { "Authorization": token }
  });
  if (response.status >= 400) {
    return response.json().then((errorMessage) => {
      errorMessage["status"] = response.status;
      const error = new Error(JSON.stringify(errorMessage));
      throw error;
    });
  }
  return await response.json();
};
