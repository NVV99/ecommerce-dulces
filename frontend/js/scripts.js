// Carga de Productos (Prueba)
const products = [
    { id: 1, name: "Chocolate", price: 29.99, image: "" },
    { id: 2, name: "Gummy Bears", price: 19.99, image: "" }
];

// Cargar productos en la tienda (Prueba)
function loadProducts() {
    const productGrid = document.getElementById("product-grid");
    if (!productGrid) return;

    productGrid.innerHTML = "";
    products.forEach(product => {
        const productCard = `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p>$${product.price.toFixed(2)}</p>
                        <button class="btn btn-outline-dark add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Manejo de Carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Agregar producto al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Conexión con Backend - Pedidos

document.addEventListener("DOMContentLoaded", () => {
    const listaPedidos = document.getElementById("lista-pedidos");
    if (!listaPedidos) return;

    // Obtener el token
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("No hay token, no se pueden obtener pedidos.");
        listaPedidos.innerHTML = "<li class='list-group-item'>Inicia sesión para ver tus pedidos.</li>";
        return;
    }

    // Hacer la solicitud al backend con el token
    fetch("http://localhost:5000/api/pedidos", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(pedidos => {
        listaPedidos.innerHTML = pedidos.length
            ? pedidos.map(p => `<li class='list-group-item'>Pedido #${p.id} - ${p.estado}</li>`).join("")
            : "<li class='list-group-item'>No hay pedidos aún.";
    })
    .catch(error => console.error("Error al obtener pedidos:", error));
});

