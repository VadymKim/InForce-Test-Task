import AbstractPage from "./abstract.page";
import ProductCardFragmet from "../fragments/productCard.fragment";

class CartPage extends AbstractPage { 
    constructor() {
        super('/cart.html');
    }

    items = () => cy.get('[data-test = "inventory-item"]');
    checkoutButton = () => cy.get('[data-test = "checkout"]');
    checkItemsbyName = (namesObject) => {
        console.log('itemName1' in namesObject);
        const namesLength = Object.getOwnPropertyNames(namesObject);
        const namesArray = Object.values(namesObject);

        this.items().then(($items) => {
            expect($items.length).be.eq(namesLength);
            $items.each((indx, item) => {
                const productCard = new ProductCardFragmet(item);
                productCard.productName().then(($name) => {
                    expect(true).to.eq(namesArray.includes($name));
                });
            });
        })    
    }
}

export default CartPage;