const Product = ({ product }) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    const productName = document.createElement("p");
    productName.textContent = product.title;
    const productImages = document.createElement("div");
    productImages.classList.add("images");
    product.images.forEach(imagePath => {
        const productImage = document.createElement("img");
        productImage.classList.add("image");
        productImage.setAttribute("src", imagePath);
        productImages.appendChild(productImage);
    })
    productContainer.appendChild(productName);
    productContainer.appendChild(productImages);
    return productContainer;
}

export default Product;
        