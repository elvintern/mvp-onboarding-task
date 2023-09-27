export const CRUDAPI = 'https://localhost:7292/api';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const ITEMS_PER_PAGE = 10;

export const sendData = async (method = '', url = '', data = {}) => {
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
};
