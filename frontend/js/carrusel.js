document.addEventListener("DOMContentLoaded", () => {
    const carouselElement = document.querySelector("#carouselExample");
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000, // Cambia cada 3 segundos
        ride: "carousel"
    });
});
