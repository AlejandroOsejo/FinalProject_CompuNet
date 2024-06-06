let products = [];

function fetchProducts() {
  return fetch('/web/data/products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      crearElementosProductos();
      actualizarEventListeners();  // Asegurarse de que los event listeners se actualicen después de crear los productos
    })
    .catch(error => console.error('Error al cargar el archivo JSON de productos:', error));
}

function crearElementosProductos() {
  const contenedorItems = document.getElementById('contenedor-items');
  contenedorItems.innerHTML = '';

  products.forEach(producto => {
    const item = document.createElement('div');
    item.className = 'item';

    item.innerHTML = `
      <span class="titulo-item">${producto.name}</span>
      <img src="${producto.image}" alt="${producto.name}" class="img-item">
      <span class="precio-item">$${producto.price}</span>
      <button class="boton-item">Agregar al Carrito</button>
    `;

    contenedorItems.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", fetchProducts);

$(document).ready(function() {
  // Mostrar el pop-up al hacer clic en el botón
  $("#add-product-button").click(function() {
    $("#product-form-popup").fadeIn(300);
  });

  // Cerrar el pop-up al hacer clic en "Cerrar" o fuera del pop-up
  $(".close-popup, .popup").click(function(event) {
    if ($(event.target).hasClass("popup") || $(event.target).hasClass("close-popup")) {
      $("#product-form-popup").fadeOut(300);
    }
  });

  // Evitar que se cierre el pop-up al hacer clic dentro de él
  $(".popup-content").click(function(event) {
    event.stopPropagation();
  });

  // Añadir producto
  $("#product-form").submit(function(event) {
    event.preventDefault();

    const name = $("#product-name").val();
    const price = $("#product-price").val();
    const description = $("#product-description").val();
    const image = $("#product-image").val();

    const newProduct = {
      id: products.length + 1,
      name: name,
      price: price,
      description: description,
      image: image
    };

    products.push(newProduct);
    $("#product-form-popup").fadeOut(300);
    console.log('Producto añadido:', newProduct);
    crearElementosProductos();  // Actualizar la lista de productos
    actualizarEventListeners();  // Asegurarse de que los event listeners se actualicen después de crear los nuevos productos
  });
});
