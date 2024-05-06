import AbstractPage from "./abstract.page";

export class CheckoutStep2Page extends AbstractPage {
    constructor() {
        super('/checkout-step-two.html');
    };

    title = () => cy.get('[data-test = "secondary-header"]');
    cardQuantityLabel = () => cy.get('[data-test = "cart-quantity-label"]');
    cardDescLabel = () => cy.get('[data-test = "cart-desc-label"]');
    paymentInfoLabel = () => cy.get('[data-test = "payment-info-label"]');
    paymentInfoValue = () => cy.get('[data-test = "payment-info-value"]');
    shippingInfoLabel = () => cy.get('[data-test = "shipping-info-label"]');
    shippingInfoValue = () => cy.get('[data-test = "shipping-info-value"]');
    totalInfoLabel = () => cy.get('[data-test = "total-info-label"]');
    subtotalLabel = () => cy.get('[data-test = "subtotal-label"]');
    items = () => cy.get('[data-test = "inventory-item"]');
    total = () => cy.get('[data-test = "total-label"]');
    tax = () => cy.get('[data-test = "tax-label"]');
    cancelButton = () => cy.get('[data-test = "cancel"]');
    finishButton = () => cy.get('[data-test = "finish"]');
    checkItems = () => {
        this.items().then(($items) => {
            cy.checkItems($items);
        });
    };
    checkIfLoaded = () => {
        this.title().invoke('text').should('contains', 'Checkout: Overview');
        this.cardQuantityLabel().should('be.visible');
        this.paymentInfoLabel().should('be.visible');
        this.paymentInfoValue().should('be.visible');
        this.shippingInfoLabel().should('be.visible');
        this.shippingInfoValue().should('be.visible');
        this.subtotalLabel().should('be.visible');
        this.tax().should('be.visible');
    };
    finishCheckout = () => this.finishButton().click();
};

