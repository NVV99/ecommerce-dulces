import { apiFetch } from './api.js';
import { addToCart } from './cart.js'; 

// 1) Ver que el módulo se carga
console.log('products.js module loaded');

// 2) Comprueba el dataset del body
console.log('Body data-section:', document.body.dataset.section);

// Espera a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  if (document.body.dataset.section === 'products') {
    console.log('Section is "products", calling loadProducts()');
    loadProducts();
  } else {
    console.log('Not on products page, section =', document.body.dataset.section);
  }
});

// 3) Función para cargar productos
export async function loadProducts() {
  console.log('loadProducts() started');
  try {
    const productos = await apiFetch('/products');
    console.log('API returned productos:', productos);

    const cont = document.getElementById("productos-container");
    if (!cont) {
      console.error('No existe el elemento #productos-container');
      return;
    }

    // Mapea y convierte precio a número
    const html = productos.map(p => {
      const priceNum = parseFloat(p.precio);
      console.log(`Producto ${p.id} priceNum=`, priceNum);
      return `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">${p.descripcion}</p>
              <p class="mt-auto fw-bold">€${priceNum.toFixed(2)}</p>
              <button class="btn btn-pink mt-2 add-to-cart-btn" data-product-id="${p.id}">
                <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    console.log('Generated HTML for cards, injecting into container');
    cont.innerHTML = html;
    
    // Añadir evento a cada botón de añadir al carrito
    cont.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = btn.getAttribute('data-product-id');
        addToCart(Number(productId));
      });
    });
  } catch (err) {
    console.error('Error dentro de loadProducts():', err);
  }
}
