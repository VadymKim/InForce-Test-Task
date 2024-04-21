class AbstractPage {
     
    constructor(url = '/') {
        this.url = url; 
    }

    visit() {
        cy.visit(this.url)
    }
}

export default AbstractPage;