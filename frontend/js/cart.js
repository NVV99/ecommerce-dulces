export function getCart() { return JSON.parse(localStorage.getItem('cart')||'[]'); }
export function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }
export function addToCart(id){ 
  const c = getCart();
  const it = c.find(x=>x.productId===id);
  if(it) it.quantity++; else c.push({productId:id,quantity:1});
  saveCart(c);
  document.getElementById('cart-count').textContent = c.reduce((s,x)=>s+x.quantity,0);
}
export function loadCartModal(){
  const c = getCart(), body=document.getElementById('cart-items'), totEl=document.getElementById('cart-total');
  body.innerHTML = c.map(i=>`
    <tr>
      <td>Producto ${i.productId}</td>
      <td>${i.quantity}</td>
      <td>€${(i.unitPrice||0).toFixed(2)}</td>
    </tr>
  `).join('');
  totEl.textContent = c.reduce((s,x)=>(x.unitPrice||0)*x.quantity+s,0).toFixed(2);
}
export function checkout(){
  // Puedes llamar a submitOrder() de checkout.js o redirigir a checkout.html
  window.location.href = 'checkout.html';
}
document.addEventListener("DOMContentLoaded", loadCartModal);
