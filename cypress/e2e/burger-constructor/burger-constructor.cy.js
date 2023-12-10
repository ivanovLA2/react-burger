describe('Burger constructor test', function() {
    beforeEach(() => {
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );

        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );
    });

    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });

    it('should be ingredient modal work', function() {
        cy.intercept('https://norma.nomoreparties.space/api/ingredients').as('getIngredients')
        cy.visit('http://localhost:3000');
        cy.wait('@getIngredients')
        cy.get('[class^=burger-ingredient_ingredient]').first().as('ingredient');
        cy.get('@ingredient').click()
        cy.get('[class^=modal]').as('modal')
        cy.get('@modal').should('be.visible')
        cy.get('@modal').find('[class^=modal_closeModal]').first().as('closeButton');
        cy.get('@closeButton').click()
        cy.get('@modal').should('not.exist')
    });

    it('ingredient should be added to order', function() {
        cy.intercept('https://norma.nomoreparties.space/api/ingredients').as('getIngredients')
        cy.visit('http://localhost:3000');
        cy.wait('@getIngredients')
        cy.get('.bun-list').first().as('bunList');
        cy.get('*[class^=burger-constructor_constructor]').first().as('constructor');
        cy.get('@bunList').find('*[class^=burger-ingredient_ingredient]').first().as('bun')

        cy.get('@bun').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('.constructor-element_pos_top').should('exist')
        cy.get('.constructor-element_pos_bottom').should('exist')
    });

    it('ingredient should be added to order', function() {
        cy.intercept('https://norma.nomoreparties.space/api/ingredients').as('getIngredients')
        cy.visit('http://localhost:3000');
        cy.wait('@getIngredients')
        cy.get('.bun-list').first().as('bunList');
        cy.get('.sauce-list').first().as('sauceList');
        cy.get('.main-list').first().as('mainList');
        cy.get('*[class^=burger-constructor_constructor]').first().as('constructor');
        cy.get('@bunList').find('*[class^=burger-ingredient_ingredient]').first().as('bun')
        cy.get('@sauceList').find('*[class^=burger-ingredient_ingredient]').first().as('sauce')
        cy.get('@mainList').find('*[class^=burger-ingredient_ingredient]').first().as('main')

        cy.get('@bun').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@sauce').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@main').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('.order-button').click();
        cy.get('.order-number').should("have.text", "123");
    });
});