import { apiFetch } from './api.js';

window.loadProfile = async function() {
  const u = await apiFetch('/users/me');
  document.getElementById('account-username').value = u.nombre;
  document.getElementById('account-email').value    = u.email;
};

window.updateProfile = async function(e) {
  e.preventDefault();
  const nombre   = document.getElementById('account-username').value;
  const telefono = document.getElementById('account-phone')?.value || '';
  const resp = await apiFetch('/users/me', {
    method:'PUT', body: JSON.stringify({ nombre, telefono })
  });
  alert(resp.message);
};

window.changePassword = async function(e) {
  e.preventDefault();
  const current = document.getElementById('account-password').value;
  const confirm = document.getElementById('account-password-confirm').value;
  if (!current || !confirm) return alert("Completa ambos campos.");
  const resp = await apiFetch('/users/me/password', {
    method:'PUT', body: JSON.stringify({ currentPassword:current, newPassword:confirm })
  });
  alert(resp.message);
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('account-form')) {
    loadProfile();
    document.getElementById('account-form').addEventListener('submit', updateProfile);
    document.getElementById('account-form').addEventListener('submit', changePassword);
  }
});
