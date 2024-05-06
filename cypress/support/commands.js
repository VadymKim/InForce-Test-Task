// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import ProductsPage from "./pages/products.page";
import ProductCardFragmet from "./fragments/productCard.fragment";
import HeaderFragment from "./fragments/header.fragment";

Cypress.Commands.add('addItemsToCart', (amount) => { 
    const productsPage = new ProductsPage();

    productsPage.productItems().then(($products) => {
        for (let i = 0; i < amount; i++) {
            cy.wrap($products[i]).within((product) => {
                const productCard = new ProductCardFragmet(product);

                productCard.getProductInfo().then((productInfo) => {
                    Cypress.env(`item${i+1}`, productInfo);
                });
                productCard.addProductToCart();
            })
        }
    })
})

Cypress.Commands.add('goToCart', () => {
    const header = new HeaderFragment();

    header.cartLink().click();
});

Cypress.Commands.add('checkItems', ($items) => {
    $items.each((indx, item) => {
        const productCard = new ProductCardFragmet(item);

        cy.wrap(Cypress.env(`item${indx+1}`)).as('productInfo');
        cy.get('@productInfo').then((product) => {
            cy.wrap(productCard.getProductInfo()).then((checkoutItem) => {
                expect(checkoutItem.name).to.eq(product.name);
                expect(checkoutItem.description).to.eq(product.description);
                expect(checkoutItem.price).to.eq(product.price);
            });
            });    
    });
});






