// Carrusel de Banners (Bootstrap) 
document.addEventListener("DOMContentLoaded", function () {
  const myCarousel = new bootstrap.Carousel("#carouselExample", {
    interval: 3000, // Tiempo entre slides (ms)
    pause: "hover",
    wrap: true,
  });
});

// Productos Destacados (Swiper)
document.addEventListener("DOMContentLoaded", function () {
  const destacadosContainer = document.getElementById("destacados-container");

  const destacados = PRODUCTS.filter(product => product.featured);

  destacados.forEach(product => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="card h-100 shadow-sm product-card" data-id="${product.id}" style="cursor: pointer;">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${product.name}</h5>
          <p class="product-price">${product.price.toFixed(2)} €</p>
        </div>
      </div>
    `;
    destacadosContainer.appendChild(slide);
  });

  // Swiper Inicialización
  new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});