document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.getElementById('order-history');

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    ordersContainer.innerHTML = `<p>Debes iniciar sesión para ver tus pedidos.</p>`;
    return;
  }

  const orders = currentUser.orders || [];

  if (orders.length === 0) {
    ordersContainer.innerHTML = `<p>Aún no tienes pedidos registrados.</p>`;
    return;
  }

  let html = '<ul class="list-group">';
  orders.forEach(order => {
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>Pedido:</strong> ${order.id}<br>
          <strong>Fecha:</strong> ${new Date(order.date).toLocaleDateString()}<br>
          <strong>Total:</strong> ${order.total.toFixed(2)} €
        </div>
      </li>
    `;
  });
  html += '</ul>';

  ordersContainer.innerHTML = html;
});
