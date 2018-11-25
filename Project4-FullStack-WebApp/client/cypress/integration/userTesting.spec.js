describe('Testing opening the page and sign in a user, and viewing the favorites', () => {
    it('Enters the page and opens the sign in component', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Sign In').click();
        cy.url().should('include', '/signin');
    });

    it('Type in wrong password on existing user', () => {
        //We now type in the wrong password and make sure we get the wrong password message back
        cy.get('[data-cy=email-input]').type('test2@gmail.com');
        cy.get('[data-cy=password-input]').type('123456789{enter}');
        cy.contains('Wrong password');
    });

    it('Type in invalid email', () => {
        //We now type in an invalid email and make sure we get that aler message back
        cy.get('[data-cy=email-input]').clear().type('heiheihei@gmail.com');
        cy.get('[data-cy=password-input]').clear().type('123456789{enter}');
        cy.contains('There are no user with that email');
    });

    it('Type in a correct username and password, and will be redirected to the home page', () => {
        //We now type in a valid email, and make sure we get redirected to the home page
        cy.get('[data-cy=email-input]').clear().type('cypress@cypress');
        cy.get('[data-cy=password-input]').clear().type('12345{enter}');
        cy.url().should('include', '/');
    });

    it('Gets the user to show its favorites', () => {
        cy.contains('Logged in as').click();
        cy.contains('View Favorite Movies').click();
    });

    it('Removes movie Inception from list, and make sure it is not in the list, then adding it back', () => {
        cy.get("#Inception").click();
        cy.get('[data-cy=search-bar]').type("Inception");
        cy.get('[data-cy=category-input]').select('Movies');
        cy.get('[data-cy=search-btn]').click();
        cy.get("#Inception").click();
        cy.contains('Logged in as').click();
        cy.contains('View Favorite Movies').click();
        cy.contains("Inception");
        cy.get('[data-cy=movie-list]').children().should('have.length', 1);
    });
});
