function getProducts() {
    return fetch('http://localhost:3000/products', {
    }).then(response => response.json());
}

export { getProducts };