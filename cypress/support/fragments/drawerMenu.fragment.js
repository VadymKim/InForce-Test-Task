class DrawerMenu {
    logoutItem = () => cy.get('[data-test = "logout-sidebar-link"]');
    logout = () => {
        this.logoutItem().click();
    }
}

export default DrawerMenu;