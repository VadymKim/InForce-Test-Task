import CheckoutPage2 from "../pages/checkoutStep2.page";

export function checkTotalPrice() {
    
    cy.wrap(Cypress.env()).then((productsInfo) => {
        const checkoutPage2 = new CheckoutPage2();
        let totalPrice = 0;
        for (let x in productsInfo) {
            totalPrice += parseFloat((productsInfo[x].price).substr(1));
        };
        checkoutPage2.tax().then(($tax) => {
            const taxString = ($tax.text()).substr(($tax.text()).indexOf('$') + 1);
            const tax = parseFloat(taxString);
            const totalWithTax = totalPrice + tax;
            
            cy.wrap(totalWithTax).then(($calculatedTotal) => {
                checkoutPage2.total().invoke('text').then(($checkoutTotal) => {
                    const checkoutTotal = parseFloat($checkoutTotal
                                                      .substr($checkoutTotal
                                                        .indexOf('$') + 1));

                    expect($calculatedTotal).to.eq(checkoutTotal);
                })
            })
        });
    });
}