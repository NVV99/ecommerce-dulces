import { apiFetch } from './api.js';

window.showHistory = async function() {
  const modalEl   = document.getElementById("historyModal");
  const modal     = new bootstrap.Modal(modalEl);
  const container = document.getElementById("history-body");

  container.innerHTML = '<p>Cargando historial...</p>';
  try {
    // Llamada a tu API: GET /api/orders
    const orders = await apiFetch('/orders');
    if (!orders.length) {
      container.innerHTML = '<p>Tu historial está vacío.</p>';
    } else {
      // Construyo una tabla con los pedidos
      container.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td>${o.id}</td>
                <td>${new Date(o.fecha).toLocaleString()}</td>
                <td>€${o.total.toFixed(2)}</td>
                <td>${o.estado}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  } catch (err) {
    console.error('Error cargando historial:', err);
    container.innerHTML = '<p class="text-danger">Error al cargar el historial.</p>';
  }

  modal.show();
};

