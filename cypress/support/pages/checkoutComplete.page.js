import AbstractPage from "./abstract.page";

class CheckoutCompletePage extends AbstractPage {
    constructor() {
        super('/checkout-complete.html');
    };

    title = () => cy.get('[data-test = "title"]');
    message = () => cy.get('[data-test = "complete-text"]');
    backHomeButton = () => cy.get('[data-test = "back-to-products"]');
};

export default CheckoutCompletePage;