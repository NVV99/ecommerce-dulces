import { API_BASE } from './config.js';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });
  return res.json();
}
