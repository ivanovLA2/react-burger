import {API_ROOT, INGREDIENTS_API} from "../../../src/services/api";

const INGREDIENT_SELECTOR = '*[class^=burger-ingredient_ingredient]';

describe('Burger constructor test', function () {

    beforeEach(() => {
        cy.intercept(API_ROOT + INGREDIENTS_API).as('getIngredients')
        cy.intercept("GET", "api/auth/user", {fixture: "user.json"});
        cy.intercept("POST", "api/orders", {fixture: "order.json"}).as("postOrder");
        cy.visit('/');
        cy.wait('@getIngredients')

        cy.get('.bun-list').first().as('bunList');
        cy.get('.sauce-list').first().as('sauceList');
        cy.get('.main-list').first().as('mainList');
        cy.get('*[class^=burger-constructor_constructor]').first().as('constructor');
        cy.get(INGREDIENT_SELECTOR).first().as('ingredient');
        cy.get('@bunList').find(INGREDIENT_SELECTOR).first().as('bun')
        cy.get('@sauceList').find(INGREDIENT_SELECTOR).first().as('sauce')
        cy.get('@mainList').find(INGREDIENT_SELECTOR).first().as('main')


        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );

        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );
    });

    it('should be available', function () {
        cy.get('*[class^=app_content]').first().should('exist')
    });

    it('should be ingredient modal work', function () {

        cy.get('@ingredient').click()
        cy.get('[class^=modal]').as('modal')
        cy.get('@modal').should('be.visible')
        cy.get('@modal').find('[class^=modal_closeModal]').first().as('closeModalButton');
        cy.get('@closeModalButton').click()
        cy.get('@modal').should('not.exist')
    });

    it('ingredient should be added to order', function () {


        cy.get('@bun').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('.constructor-element_pos_top').should('exist')
        cy.get('.constructor-element_pos_bottom').should('exist')
    });

    it('ingredient should be added to order', function () {


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