import LoginPage from "../support/pages/login.page";
import ProductsPage from "../support/pages/products.page";
import CartPage from "../support/pages/cart.page";
import HeaderFragment from "../support/fragments/header.fragment";
import { commonUser } from "../fixtures/usersData.json";

describe('verifying products page functionality', () => {
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const cardPage = new CartPage();
    const header = new HeaderFragment();
    const userName = commonUser.userName;
    const password = commonUser.password;
    

    beforeEach(() => {
        cy.intercept('/service-worker.js', {
            body: undefined
        })    
    });

    it('a user can add the items to the cart', () => {
        const amountOfProductsToAdd = 2;

        loginPage.login(userName, password);
        productsPage.productItems().then(($products) => {
            if ($products.length > amountOfProductsToAdd) {
                cy.addItemsToCart(amountOfProductsToAdd);
            }
        }).then(() => {
            header.cartBadgeText().then((text) => {
                expect(text).equal(amountOfProductsToAdd.toString());
                cy.goToCart();
                cardPage.items().its('length').should('eq', amountOfProductsToAdd);
            })
        });
    });
});