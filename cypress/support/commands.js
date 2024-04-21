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

Cypress.Commands.add('addItemsToCart', (amount) => { 
    const productsPage = new ProductsPage();

    productsPage.productItems().then(($products) => {
        for (let i = 0; i < amount; i++) {
            cy.wrap($products[i]).within((product) => {
                const productCard = new ProductCardFragmet(product);

                productCard.getProductInfo().then((productInfo) => {
                    console.log(productInfo);
                    Cypress.env(`item${i+1}`, productInfo);
                });
                productCard.addToCartButton().click();
            })
        }
    })
})