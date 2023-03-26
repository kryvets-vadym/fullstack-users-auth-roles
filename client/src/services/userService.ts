import { httpClient } from '../http/httpClient';

function getAll() {
  return httpClient.get('/api/users')
}

export const userService = { getAll };
