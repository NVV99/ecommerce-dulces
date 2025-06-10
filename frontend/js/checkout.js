import { apiFetch } from './api.js';
import { getCart, saveCart } from './cart.js';

window.submitOrder = async function() {
  const cart = getCart();
  if(!cart.length) return alert("Carrito vacío");
  const addressId = 1; // o selecciona el real
  let total = 0;
  const items = cart.map(i => {
    const price = i.unitPrice||0;
    total += price*i.quantity;
    return { productId:i.productId, quantity:i.quantity, unitPrice:price };
  });
  const resp = await apiFetch('/orders', { method:'POST', body: JSON.stringify({ addressId, total, items }) });
  if(resp.orderId){
    alert(`Pedido ${resp.orderId} creado`);
    saveCart([]);
    window.location.href='orders.html';
  } else alert(resp.message||'Error');
};
