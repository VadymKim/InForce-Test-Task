import LoginPage from "../support/pages/login.page";
import ProductsPage from "../support/pages/products.page";
import { checkTotalPrice } from "../support/helpers/checkTotalPrice";
import { CheckoutStep1Page } from "../support/pages/checkoutStep1.page";
import { CheckoutStep2Page } from "../support/pages/checkoutStep2.page";
import CheckoutCompletePage from "../support/pages/checkoutComplete.page";
import DrawerMenu from "../support/fragments/drawerMenu.fragment";
import HeaderFragment from "../support/fragments/header.fragment";
import CartPage from "../support/pages/cart.page";
import { commonUser } from "../fixtures/usersData.json";

describe('verifying a checkout', () => {
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();
    const checkoutStep1 = new CheckoutStep1Page();
    const checkoutStep2 = new CheckoutStep2Page();
    const checkoutCompletePage = new CheckoutCompletePage();
    const userName = commonUser.userName;
    const password = commonUser.password;
    const numberOfProducts = 2;

    beforeEach(() => {
        cy.intercept('/service-worker.js', {
            body: undefined
        })    
    });

    it('a user can proceed to checkout', () => {
        loginPage.login(userName, password);
        cy.addItemsToCart(numberOfProducts);
        cy.goToCart();
        cartPage.checkItems();
        cartPage.goToCheckout();
        checkoutStep1.fillFormWithTestDate();
        checkoutStep1.goToStep2();
        checkoutStep2.checkItems();
    });

    it('checks pre-filling Your information based on the logged-in user', () => {
        // I should mention that pre-filling doesn't work on the page, 
        // so this test will fail each time it runs
        const firstName = commonUser.firstName;
        const lastName = commonUser.lastName;
        const zipCode = commonUser.zipCode;

        loginPage.login(userName, password);
        cy.goToCart();
        cartPage.goToCheckout();
        // You can take away comment from the line bellow to make the test pass
        //checkoutPage1.fillFormWithTestDate();
        checkoutStep1.firstNameInput().should('have.value', firstName);
        checkoutStep1.lastNameInput().should('have.value', lastName);
        checkoutStep1.zipCode().should('have.value', zipCode);
    });

    it('a user can make the checkout', () => {
        loginPage.login(userName, password);
        cy.addItemsToCart(numberOfProducts);
        cy.goToCart();
        cartPage.goToCheckout();
        checkoutStep1.fillFormWithTestDate();
        checkoutStep1.goToStep2();
        checkoutStep2.checkIfLoaded();
        checkoutStep2.checkItems();
        checkTotalPrice();
    });

    it('a user can submit a checkout', () => {
        loginPage.login(userName, password);
        cy.addItemsToCart(numberOfProducts);
        cy.goToCart();
        cartPage.goToCheckout();
        checkoutStep1.fillFormWithTestDate();
        checkoutStep1.goToStep2();
        checkoutStep2.checkIfLoaded();
        checkoutStep2.finishCheckout();
        checkoutCompletePage.checkIfLoaded();
        checkoutCompletePage.checkSuccessMessage();
    });

    it('a user can log out after checkout completion', () => {
        const header = new HeaderFragment();
        const drawerMenu = new DrawerMenu();

        loginPage.login(userName, password);
        cy.goToCart();
        cartPage.goToCheckout();
        checkoutStep1.fillFormWithTestDate();
        checkoutStep1.goToStep2();
        checkoutStep2.finishCheckout();
        checkoutCompletePage.goHome();
        header.openMenu();
        drawerMenu.logout();
        loginPage.checkIfLoaded();
    });
});

