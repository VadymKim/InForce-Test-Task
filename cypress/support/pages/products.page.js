import AbstractPage from "./abstract.page";

export class ProductsPage extends AbstractPage {
    constructor() {
        super('/inventory.html');
    };

    title = () => cy.get('[data-test = "title"]');
    productItems = () => cy.get('[data-test = "inventory-item"]');
    removeButtons = () => cy.get('button[data-test *= "remove"]');
};

