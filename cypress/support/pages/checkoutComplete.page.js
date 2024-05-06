import AbstractPage from "./abstract.page";

export class CheckoutCompletePage extends AbstractPage {
    successMessage =  "Your order has been dispatched," +
                      " and will arrive just as fast as" +
                      " the pony can get there!";

    constructor() {
        super('/checkout-complete.html');
    };

    title = () => cy.get('[data-test = "title"]');
    message = () => cy.get('[data-test = "complete-text"]');
    backHomeButton = () => cy.get('[data-test = "back-to-products"]');
    checkIfLoaded = () => {
        this.title().invoke('text').should('contains', 'Checkout: Complete!');
    };    
    checkSuccessMessage = () => {
        this.message()
            .should('be.visible')
            .and('have.text', successMessage);
    };
    goHome = () => {
        this.backHomeButton().click();
    }
};

