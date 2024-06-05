const products = [
    {
      id: 1,
      name: 'Turtwig',
      price: "12",
      description: 'A small, turtle-like Pokémon. It has a hard shell that protects its body. Turtwig typically eats green leaves and lives in forests.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/387.png'
    },
    {
      id: 2,
      name: 'Chimchar',
      price: "15",
      description: 'A monkey-like Pokémon with a fiery spirit. It has a flame on its tail that it uses to attack and stay warm. Chimchar lives in grasslands and loves to eat berries.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png'
    },
    {
      id: 3,
      name: 'Piplup',
      price: "20",
      description: 'A penguin-like Pokémon that lives near the water. It is known for its proud and stubborn nature. Piplup can swim very well and uses its wings to attack.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/393.png'
    },
    {
      id: 4,
      name: 'Bulbasaur',
      price: "25",
      description: 'A seed Pokémon that looks like a small dinosaur. It has a bulb on its back that contains a seed that can grow into a flower. Bulbasaur lives in forests and meadows.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'
    },
    {
      id: 5,
      name: 'Charmander',
      price: "12",
      description: 'A lizard-like Pokémon that breathes fire. It has a flame on its tail that it uses to attack and stay warm. Charmander lives in mountains and volcanoes.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'
    },
    {
      id: 6,
      name: 'Squirtle',
      price: "15",
      description: 'A turtle-like Pokémon that can withdraw into its shell for protection. It has two water cannons on its back that it uses to shoot water jets. Squirtle lives near bodies of water.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'
    },
    {
      id: 7,
      name: 'Dialga',
      price: "1.000",
      description: 'A legendary Pokémon that controls time. It is said to be able to travel through time and alter the past and future.',
      image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/483.png'
    },
    {
      id: 8,
      name: 'Arceus',
      price: "10.000",
      description: 'The Alpha Pokémon, said to have created the Pokémon universe. It is said to be the most powerful Pokémon of all.',
      image: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/96/latest/20150601113031/Arceus.png/800px-Arceus.png'
    },
    {
      id: 9,
      name: 'Pidgey',
      price: "10",
      description: 'A small, plump-bodied avian Pokémon. It is primarily brown with a cream-colored face, underside, and flight feathers. On top of its head is a short crest of three tufts.',
      image: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/b/b7/latest/20200307022723/Pidgey.png/200px-Pidgey.png'
    }
  ];



function actualizarImagenes() {
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const tituloItem = item.querySelector('.titulo-item').textContent;
        const productoEncontrado = products.find(producto => producto.name === tituloItem);

        if (productoEncontrado) {
            const imgItem = item.querySelector('.img-item');
            imgItem.src = productoEncontrado.image;
            imgItem.alt = productoEncontrado.name;
        } else {
            console.log(`No se encontró un producto correspondiente para ${tituloItem}`);
        }
    });
}

function actualizarPrecios() {
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const tituloItem = item.querySelector('.titulo-item').textContent;
        const productoEncontrado = products.find(producto => producto.name === tituloItem);

        if (productoEncontrado) {
            const precioItem = item.querySelector('.precio-item');
            precioItem.textContent = `$${productoEncontrado.price}`;
        } else {
            console.log(`No se encontró un producto correspondiente para ${tituloItem}`);
        }
    });
}

actualizarImagenes();
actualizarPrecios();



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
  });

  actualizarImagenes();
  actualizarPrecios();
});



  
  