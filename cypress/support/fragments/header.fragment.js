class HeaderFragment {
   menuIcon = () => cy.get('#react-burger-menu-btn');
   cartLink = () => cy.get('[data-test = "shopping-cart-link"]');
   cartBadge = () => cy.get('[data-test = "shopping-cart-badge"]');
   cartBadgeText = () => this.cartBadge().invoke('text');
   openMenu = () => {
      this.menuIcon().scrollIntoView().click({ force: true });
   };
}

export default HeaderFragment;