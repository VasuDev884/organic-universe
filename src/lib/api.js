const BASE = 'https://organic-universe-backend.onrender.com/api';

async function req(path, options = {}) {
  const token = localStorage.getItem('ou_admin_token');
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const login = (username, password) =>
  req('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
export const verifyToken = () => req('/auth/verify');
export const submitContact = (data) =>
  req('/contacts', { method: 'POST', body: JSON.stringify(data) });
export const getContacts = (params = {}) =>
  req(`/contacts?${new URLSearchParams(params)}`);
export const getContactStats = () => req('/contacts/stats/summary');
export const updateContact = (id, data) =>
  req(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteContact = (id) =>
  req(`/contacts/${id}`, { method: 'DELETE' });
export const getServices = () => req('/services');
export const createService = (data) =>
  req('/services', { method: 'POST', body: JSON.stringify(data) });
export const updateService = (id, data) =>
  req(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteService = (id) =>
  req(`/services/${id}`, { method: 'DELETE' });
export const getAdminClients = () => req('/clients');
export const createClient = (data) =>
  req('/clients', { method: 'POST', body: JSON.stringify(data) });
export const updateClient = (id, data) =>
  req(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteClient = (id) =>
  req(`/clients/${id}`, { method: 'DELETE' });