document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria") || "todos";
    
    const tituloElement = document.getElementById("titulo-productos");
    const contenedor = document.getElementById("productos-container");

    // Verificamos que los elementos existen antes de modificarlos
    if (!tituloElement || !contenedor) {
        console.error("Error: Elementos HTML no encontrados.");
        return;
    }

    // Títulos para cada categoría
    const titulos = {
        todos: "Nuestros Productos",
        dulces: "Nuestros Dulces",
        chocolates: "Nuestros Chocolates",
        bizcochos: "Nuestros Bizcochos",
        bebidas: "Nuestras Bebidas"
    };

    // Actualizar el título de la sección
    tituloElement.textContent = titulos[categoria] || "Nuestros Productos";

    // Lista de productos
    const productos = [
        { id: 1, categoria: "dulces", nombre: "Gominolas variadas", precio: "3.99€", imagen: "img/dulce1.jpg" },
        { id: 2, categoria: "dulces", nombre: "Caramelos de miel", precio: "2.50€", imagen: "img/dulce2.jpg" },
        { id: 3, categoria: "chocolates", nombre: "Chocolate con almendras", precio: "5.50€", imagen: "img/chocolate1.jpg" },
        { id: 4, categoria: "bizcochos", nombre: "Muffins de chocolate", precio: "4.99€", imagen: "img/bizcocho1.jpg" },
        { id: 5, categoria: "bebidas", nombre: "Batido de fresa", precio: "2.99€", imagen: "img/bebida1.jpg" }
    ];

    // Filtra productos según categoría
    const productosFiltrados = productos.filter(p => categoria === "todos" || p.categoria === categoria);
    
    productosFiltrados.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");

        div.innerHTML = `
            <div class="product-card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="price">${producto.precio}</p>
                <button class="btn btn-dark">Añadir al carrito</button>
            </div>
        `;

        contenedor.appendChild(div);
    });
});
