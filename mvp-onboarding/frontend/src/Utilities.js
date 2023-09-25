export const CRUDAPI = 'https://localhost:7292/api/Customers';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
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

// export function toPascalCase(str) {
//   if (!str) return '';
//   // Remove all non-word characters (like punctuation or numbers) and split the
//   // string into words.
//   return str
//     .replace(/[^a-zA-Z\s]/g, '')
//     .split(/[\s_]+/) // split the string into words
//     .map(
//       (word) =>
//         // For each word, capitalize the first letter and join with the rest of the word.
//         word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//     )
//     .join(''); // Join all the words back together.
// }

// export function extractKeys(data) {
//   if (!Array.isArray(data) || data.length === 0) {
//     return [];
//   }

//   const keys = Object.keys(data[0]).filter((el) => el !== 'id');
//   const [firstKey, secondKey, ...restKeys] = keys;

//   return [firstKey, secondKey, ...restKeys];
// }
