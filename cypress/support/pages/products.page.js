import AbstractPage from "./abstract.page";

class ProductsPage extends AbstractPage {
    constructor() {
        super('/inventory.html');
    };

    title = () => cy.get('[data-test = "title"]');
    cartLink = () => cy.get('[data-test = "shopping-cart-link"]');
    productItems = () => cy.get('[data-test = "inventory-item"]');
    cartBage = () => cy.get('[data-test = "shopping-cart-badge"]');
    removeButtons = () => cy.get('button[data-test *= "remove"]');
    cartIcon = () => cy.get('[data-test = "shopping-cart-link"]');
}

export default ProductsPage;