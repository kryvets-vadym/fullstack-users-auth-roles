import { authClient } from '../http/authClient';

interface RegisterParams {
  username: string,
  email: string,
  password: string,
}

function register({ username, email, password }: RegisterParams) {
  return authClient.post('/api/registration', { username, email, password })
}

interface LoginParams {
  email: string,
  password: string,
}

function login({ email, password }: LoginParams) {
  return authClient.post('/api/login', { email, password })
}

function logout() {
  return authClient.post('/api/logout')
}

function activate(activationToken: string) {
  return authClient.get(`/api/activate/${activationToken}`);
}

function refresh() {
  return authClient.get('/api/refresh');
}

export const authService = { register, login, logout, activate, refresh };
