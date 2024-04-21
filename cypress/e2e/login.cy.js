import LoginPage from "../support/pages/login.page";
import ProductsPage from "../support/pages/products.page";
import userData from "../fixtures/usersData.json";

describe('verifying login page', () => {
    const loginPage = new LoginPage();
    const userName = userData.commonUser.userName;
    const password = userData.commonUser.password;

    beforeEach(() => {
        cy.intercept('/service-worker.js', {
            body: undefined
        })    
    });
    

    it('the login page is accessible and loads without errors.', () => {
        loginPage.visit('/');
        cy.url().should('eq', Cypress.config('baseUrl') + "/");
        loginPage.title().should('exist').and('be.visible');
        loginPage.userNameInput().should('exist').and('be.visible');
        loginPage.loginButton().should('be.enabled');
    });

    it('a user with valid login credentials can log in successfully.', () => {
        const productsPage = new ProductsPage();
        
        loginPage.login(userName, password);
        productsPage.title().should('have.text', 'Products');
        productsPage.cartLink().should('be.visible');
    });

    it('a user with invalid login credentials cannot log in and a proper message appears', () => {
        const invalidPassword = 'djjdjd';
        const errorMessageText = 'Epic sadface: Username and password' +
                                 ' do not match any user in this service'  

        cy.intercept('POST', 'https://submit.backtrace.io/UNIVERSE/TOKEN/json').as('submit');
        loginPage.login(userName, invalidPassword);
        loginPage.errorMessage()
                 .should('be.visible')
                 .and(($message) => {
                    expect($message).to.have.text(errorMessageText);
                 });
        cy.url().then(($url) => {
            expect($url).to.eq(loginPage.getUrl() + "/");
        });
        cy.get('form').find('[data-test = "login-button"]').should('be.visible');
     });
});