import { apiFetch } from './api.js';

window.sendContact = async function(e) {
  e.preventDefault();
  const f = e.target;
  const data = f.nombre && f.email
    ? { nombre: f.nombre.value, email: f.email.value, mensaje: f.mensaje.value }
    : { mensaje: f.mensaje.value };
  const resp = await apiFetch('/contact', { method:'POST', body: JSON.stringify(data) });
  alert(resp.message);
};
