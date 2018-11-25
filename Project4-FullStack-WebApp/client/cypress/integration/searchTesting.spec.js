describe('Testing the movie Detail, that it opens and closes when intended', () => {
    it('Opening the first movie in the list, and checking if we get the details, and then closing', () => {
        cy.visit("http://localhost:3000");
        cy.wait(250);
        cy.get("[data-cy=movie-list]").children().first().click();
        cy.contains("Director");
        cy.contains("Cast");
        cy.contains("Genres");
        cy.contains("Popularity");
        cy.get('[data-cy=close-button]').click();
    });
});

describe('Testing the page scrolling', () => {
    it('Scrolling down the page, checking if new movies are rendered', () => {
        cy.scrollTo('bottom').then(() => {
            cy.get('[data-cy=movie-list]').children().should('have.length', 20);
        })
    })
});


describe('Testing the search functionality for specific movie as well as genre', () => {
    it('Searching for specific movie Venom', () => {
        cy.visit("http://localhost:3000");
        cy.get("[data-cy=search-bar]").type("Venom");
        cy.get("[data-cy=category-input]").select("Movies");
        cy.get('[data-cy=search-btn]').click();
        cy.get("[data-cy=movie-list]").children().should("have.length", 2);
    });

    it("Search for movies of a specific genre, will test Action, and check that all movies contains action as a genre", () => {
        cy.get("[data-cy=search-bar]").clear().type("Action");
        cy.get("[data-cy=category-input]").select("Genres");
        cy.get('[data-cy=search-btn]').click();
        cy.get("[data-cy=movie-list]").children().should("have.length", 10);
        cy.get("[data-cy=movie-list]").children().each(movie =>{
            cy.wrap(movie).click().contains("Action");
        });
    });

});

describe("Testing the options in the search bar", () => {
    it("Testing for genre options", () => {
        cy.get('[data-cy=search-bar]').clear().type('Action').then(() => {
            cy.get('[data-cy=option-list]').children().first().should('have.value', 'Action');
        });
    });

    it("Testing for movie options", () => {
        cy.get('[data-cy=category-input]').select("Movies");
        cy.get('[data-cy=search-bar]').clear().type('Batman').then(() => {
            cy.get('[data-cy=option-list]').children().should('have.length', 6);
            cy.get('[data-cy=option-list]').children().first().should('have.value', 'Batman v Superman: Dawn of Justice');
        });
    });
});

describe('Testing the sorting methods for the page', () => {
    it('Checking most popular movies in descending order, must return Venom on top', () => {
        cy.get('[data-cy=search-bar]').clear();
        cy.get('[data-cy=sort-input]').select("Popularity");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains("Venom");
    });

    it('Getting the least popular movie in the database', () => {
        cy.get('[data-cy=sort-order]').select("Asc");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains("David");
    });

    it('Getting the oldest movie in the database, must return the 5th element, since some movies do not have a defined year', () => {
        cy.get('[data-cy=sort-input]').select("Year");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().eq(8).contains("Workers Leaving the Lumière Factory");
    });

    it('Getting the newest movie in the database, must return ', () => {
        cy.get('[data-cy=sort-order]').select("Desc");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains("Indiana Jones 5");
    });

    it('Getting the highest rated movie from the database', () => {
        cy.get('[data-cy=sort-input]').select("Rating");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains('Touch by Touch');

    });
    it('Getting the lowest rated movie from the database', () => {
        cy.get('[data-cy=sort-order]').select("Asc");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains('River Runs Red');
    });

    it('Sorting the movies by name in ascending order', () => {
        cy.get('[data-cy=sort-input]').select("Title");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains('"Campe0nes"');
    });

    it('Sorting the movies by name in descending order', () => {
        cy.get('[data-cy=sort-order]').select("Desc");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains('’Round Midnight');
    });

    it('Sorting the movies by vote count in descending order', () => {
        cy.get('[data-cy=sort-input]').select("Votes");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains('Inception');
    });

    it('Sorting the movies by vote count in ascending order', () => {
        cy.get('[data-cy=sort-order]').select("Asc");
        cy.get('[data-cy=search-btn]').click();
        cy.wait(150);
        cy.get('[data-cy=movie-list]').children().should("have.length", 10);
        cy.get('[data-cy=movie-list]').children().first().contains('River Runs Red');
    });
});


