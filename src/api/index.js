import { auth } from '../config';
import catalogAPI from './catalog';
import searchAPI from './search';
import queryString from 'query-string';

const baseURL = 'https://app.traineffective.com/api/v1.0';

const request = async (path, method, data) => {
  let url = `${baseURL}${path}`;

  if (method === 'get' && data && data.params) {
    url = `${url}?${queryString.stringify(data.params)}`;
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (!__DEV__) {
    // Put the user token if present
    const token = await auth.currentUser.getIdToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const body = method === 'post' ? data : null;

  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  return response.json();
};

const instance = {
  get: (url, params) => request(url, 'get', params),
  post: (url, body) => request(url, 'post', body),
};

const catalog = catalogAPI(instance);
const search = searchAPI(instance);

export { catalog, search };
