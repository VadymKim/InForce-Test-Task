import LoginPage from "../support/pages/login.page";
import ProductsPage from "../support/pages/products.page";
import { checkItems } from "../support/helpers/checkItems";
import { checkTotalPrice } from "../support/helpers/checkTotalPrice";
import CheckoutPage1 from "../support/pages/checkout1.page";
import CheckoutPage2 from "../support/pages/checkout2.page";
import CheckoutCompletePage from "../support/pages/checkoutComplete.page";
import DrawerMenu from "../support/fragments/drawerMenu.fragment";
import HeaderFragment from "../support/fragments/header.fragment";
import CartPage from "../support/pages/cart.page";
import { commonUser } from "../fixtures/usersData.json";

describe('verifying a checkout', () => {
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();
    const checkoutPage1 = new CheckoutPage1();
    const checkoutPage2 = new CheckoutPage2();
    const checkoutCompletePage = new CheckoutCompletePage();
    const userName = commonUser.userName;
    const password = commonUser.password;
    const amount = 2;

    beforeEach(() => {
        cy.intercept('/service-worker.js', {
            body: undefined
        })    
    });

    it('a user can proceed to checkout', () => {
        loginPage.login(userName, password);
        cy.addItemsToCart(amount);
        productsPage.cartIcon().click();
        cartPage.items().then(($items) => {
            checkItems($items);
        })
        cartPage.checkoutButton().click();
        checkoutPage1.fillFormWithTestDate();
        checkoutPage1.continueButton().click();
        checkoutPage2.items().then(($items) => {
            checkItems($items);
        })
    });

    it('checks pre-filling Your information based on the logged-in user', () => {
        // I should mention that pre-filling doesn't work on the page, 
        // so this test will fail each time it runs
        const firstName = commonUser.firstName;
        const lastName = commonUser.lastName;
        const zipCode = commonUser.zipCode;

        loginPage.login(userName, password);
        productsPage.cartIcon().click();
        cartPage.checkoutButton().click();
        // You can take away comment from the line bellow to make the test pass
        //checkoutPage1.fillFormWithTestDate();
        checkoutPage1.firstNameInput().should('have.value', firstName);
        checkoutPage1.lastNameInput().should('have.value', lastName);
        checkoutPage1.zipCode().should('have.value', zipCode);

    });

    it('a user can make the checkout', () => {
        loginPage.login(userName, password);
        cy.addItemsToCart(amount);
        productsPage.cartIcon().click();
        cartPage.checkoutButton().click();
        checkoutPage1.fillFormWithTestDate();
        checkoutPage1.continueButton().click();
        checkoutPage2.title().invoke('text').should('contains', 'Checkout: Overview');
        checkoutPage2.cardQuantityLabel().should('be.visible');
        checkoutPage2.paymentInfoLabel().should('be.visible');
        checkoutPage2.paymentInfoValue().should('be.visible');
        checkoutPage2.shippingInfoLabel().should('be.visible');
        checkoutPage2.shippingInfoValue().should('be.visible');
        checkoutPage2.subtotalLabel().should('be.visible');
        checkoutPage2.tax().should('be.visible');
        checkoutPage2.items().then(($items) => {
            checkItems($items);
            checkTotalPrice();
        })
    });

    it('a user can submit a checkout', () => {
        const successMessageText = "Your order has been dispatched," +
                                   " and will arrive just as fast as" +
                                   " the pony can get there!"
        
        loginPage.login(userName, password);
        cy.addItemsToCart(amount);
        productsPage.cartIcon().click();
        cartPage.checkoutButton().click();
        checkoutPage1.fillFormWithTestDate();
        checkoutPage1.continueButton().click();
        checkoutPage2.title().invoke('text').should('contains', 'Checkout: Overview');
        checkoutPage2.finishButton().click();
        checkoutCompletePage.title().invoke('text').should('contains', 'Checkout: Complete!');
        checkoutCompletePage.message()
                            .should('be.visible')
                            .and('have.text', successMessageText);
    });

    it('a user can log out after a checkout completion', () => {
        const header = new HeaderFragment();
        const drawerMenu = new DrawerMenu();

        loginPage.login(userName, password);
        productsPage.cartIcon().click();
        cartPage.checkoutButton().click();
        checkoutPage1.fillFormWithTestDate();
        checkoutPage1.continueButton().click();
        checkoutPage2.finishButton().click();
        checkoutCompletePage.backHomeButton().click();
        productsPage.title().should('be.visible');
        header.menuIcon().scrollIntoView().click({ force: true });
        drawerMenu.logoutItem().click();
        cy.url().then(($url) => {
            expect($url).to.eq(loginPage.getUrl() + "/");
        })
        cy.get('form').find('[data-test = "login-button"]').should('be.visible');
    });
});

