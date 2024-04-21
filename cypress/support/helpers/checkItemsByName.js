import ProductCardFragmet from "../fragments/productCard.fragment";

export function checkItemsByName($items) {
    
    $items.each((indx, item) => {
        const productCard = new ProductCardFragmet(item);

        cy.wrap(Cypress.env(`item${indx+1}`)).as('productInfo');
        cy.get('@productInfo').then((product) => {
            cy.wrap(productCard.getProductInfo()).then((checkoutItem) => {
                expect(checkoutItem.name).to.eq(product.name);
            });
        });    
    });
}
