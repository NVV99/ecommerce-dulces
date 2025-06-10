import { apiFetch } from './api.js';

window.createProduct = async function(e) {
  e.preventDefault();
  const f = e.target;
  const data = {
    nombre: f.nombre.value,
    descripcion: f.descripcion.value,
    imagen: f.imagen.value,
    precio: parseFloat(f.precio.value),
    stock: parseInt(f.stock.value),
    categoria_id: parseInt(f.categoria_id.value)
  };
  const resp = await apiFetch('/products', { method:'POST', body: JSON.stringify(data) });
  alert(resp.message);
};

window.updateProduct = async function(id,e) {
  e.preventDefault();
  const f = e.target;
  const data = {
    nombre: f.nombre.value,
    descripcion: f.descripcion.value,
    imagen: f.imagen.value,
    precio: parseFloat(f.precio.value),
    stock: parseInt(f.stock.value),
    categoria_id: parseInt(f.categoria_id.value)
  };
  const resp = await apiFetch(`/products/${id}`, { method:'PUT', body: JSON.stringify(data) });
  alert(resp.message);
};

window.deleteProduct = async function(id) {
  const resp = await apiFetch(`/products/${id}`, { method:'DELETE' });
  alert(resp.message);
};
