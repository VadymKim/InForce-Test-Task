import AbstractPage from "./abstract.page";
import { commonUser } from "../../fixtures/usersData.json";

class CheckoutPage1 extends AbstractPage {
    constructor() {
        super('/checkout-step-one.html');
    };
    
    firstNameInput = () => cy.get('[data-test = "firstName"]');
    lastNameInput = () => cy.get('[data-test = "lastName"]');
    zipCode = () => cy.get('[data-test = "postalCode"]');
    continueButton = () => cy.get('[data-test = "continue"]');
    fillFormWithTestDate = () => {
        this.firstNameInput().type(commonUser.firstName);
        this.lastNameInput().type(commonUser.lastName);
        this.zipCode().type(commonUser.zipCode);
    };
};

export default CheckoutPage1