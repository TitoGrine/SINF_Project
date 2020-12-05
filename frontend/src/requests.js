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
  

export const sendHttpRequest = async (method, url, data) => {
  const response = await fetch(url, {
    method: method,
    data: JSON.stringify({access_token : data}),
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
