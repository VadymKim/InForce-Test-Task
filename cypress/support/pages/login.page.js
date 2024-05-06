import AbstractPage from "./abstract.page";

class LoginPage extends AbstractPage {
    constructor() {
        super('/');
    };
    
    title = () => cy.contains('Swag Labs');
    userNameInput = () => cy.get('[data-test = "username');
    passwordInput = () => cy.get('[data-test = "password"');
    loginButton = () => cy.get('[data-test = "login-button"]');
    errorMessage = () => cy.get('[data-test = "error"]');
    getUrl = () => Cypress.config('baseUrl');
    login = (username, password) => {
        this.visit();
        this.userNameInput().type(username);
        this.passwordInput().type(password);
        this.loginButton().click();
    };
    checkIfLoaded = () => {
        cy.url().then(($url) => {
            expect($url).to.eq(loginPage.getUrl() + "/");
        })
        cy.get('form').find('[data-test = "login-button"]').should('be.visible');
    };
};

export default LoginPage;