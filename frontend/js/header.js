document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cart-count");
    const loginButton = document.querySelector("[data-bs-target='#loginModal']");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cartItems.length; // Muestra la cantidad de productos en el carrito

    loginButton.addEventListener("click", () => {
        alert("Redirigiendo a inicio de sesión...");
    });
});
