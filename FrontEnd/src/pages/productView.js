import Product from "../components/product.js";
import { getProducts } from "../services/ProductService.js";

async function ProductView() {
    const products = await getProducts();
    const $view = document.createElement("div");
    $produc.classList.add("products");

    products.forEach(product => {
        $vproduc.appendChild(Product(element));
    });

    return $produc;
}

export default ProductView;