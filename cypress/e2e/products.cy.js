import LoginPage from "../support/pages/login.page";
import ProductsPage from "../support/pages/products.page";
import { commonUser } from "../fixtures/usersData.json";

describe('verifying products page functionality', () => {
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const userName = commonUser.userName;
    const password = commonUser.password;
    const amount = 2;

    beforeEach(() => {
        cy.intercept('/service-worker.js', {
            body: undefined
        })    
    });

    it('a user can add the items to the cart', () => {
        loginPage.login(userName, password);
        cy.addItemsToCart(amount);
        productsPage.cartBage()
          .invoke('text')
          .then(($text) => {expect($text).equal(amount.toString())});
        productsPage.removeButtons().its('length').should('be.eq', amount);  
    });
});