class ProductCardFragmet {
    constructor(element) {
        this.element = element
    };
    getWrapper = () => cy.wrap(this.element);

    productName = () => {
        this.getWrapper().find('[data-test = "inventory-item-name"]').invoke('text').as('name');
    };

    productDescription = () => {
        this.getWrapper().find('[data-test = "inventory-item-desc"]').invoke('text').as('description');
    }; 

    productPrice = () => {
        this.getWrapper().find('[data-test = "inventory-item-price"]').invoke('text').as('price');
    };
    
    addToCartButton = () => cy.get('button[data-test *="add-to-cart"]');

    getProductInfo = () => {
        const productInfo = {};

        this.productName();
        this.productDescription();
        this.productPrice();
        cy.then(function() {
            productInfo.name = this.name;
            productInfo.description = this.description;
            productInfo.price = this.price;
        });
        return new Promise((resolve) => {
            resolve(productInfo);
        })
    };
}

export default ProductCardFragmet;