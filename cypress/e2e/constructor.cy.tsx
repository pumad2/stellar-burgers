/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.mockIngredients();
    cy.wait('@getIngredients');
});

afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление начинки в конструктор', () => {
        cy.get('[data-testid="main1"]')
            .find('button')
            .click();

        cy.get('[data-testid="burger-constructor"]').within(() => {
            cy.get('[data-testid="constructor-main1"]').should('exist');
        })
    });

    it('Добавление соуса в конструктор', () => {
        cy.get('[data-testid="sauce1"]')
            .find('button')
            .click();

        cy.get('[data-testid="burger-constructor"]').within(() => {
            cy.get('[data-testid="constructor-sauce1"]').should('exist');
        })
    });

    it('Добавление булки в конструктор', () => {
        cy.get('[data-testid="bun1"]')
            .find('button')
            .click();

        cy.get('[data-testid="burger-constructor"]').within(() => {
            cy.contains('Булка 1 (верх)').should('exist');
            cy.contains('Булка 1 (низ)').should('exist');
        });
    });
});

describe('Работа модального окна ингредиента', () => {
    it('Открытие модального окна', () => {
        cy.get('[data-testid="bun1"]').click();

        cy.get('[data-testid="modal"]')
            .should('be.visible')
            .should('contain.text', 'Булка 1');
    });

    it('Закрытие модального окна', () => {
        cy.get('[data-testid="bun1"]').click();

        cy.get('[data-testid="modal"]').within(() => {
            cy.get('[data-testid="modal-close"]').click();
        });

        cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('Закрытие модального окна при клике на оверлей', () => {
        cy.get('[data-testid="bun1"]').click();
        cy.get('[data-testid="modal-overlay"]').click({ force: true });

        cy.get('[data-testid="modal"]').should('not.exist');
    });
});

describe('Создание заказа', () => {
    beforeEach(() => {
        cy.mockUser();
        cy.setToken();
        cy.mockOrder();
        cy.wait('@getUser');
    });

    it('Открытие модального окна', () => {
        cy.get('[data-testid="bun1"]')
            .find('button')
            .click();

        cy.get('[data-testid="burger-constructor"]').within(() => {
            cy.get('[data-testid="constructor-orderButton"]').click();
        });

        cy.wait('@orderBurger');

        cy.get('[data-testid="modal"]')
            .should('be.visible')
            .should('contain.text', '123');
    });

    it('Закрытие модального окна и очистка конструктора', () => {
        cy.get('[data-testid="bun1"]')
            .find('button')
            .click();

        cy.get('[data-testid="sauce1"]')
            .find('button')
            .click();

        cy.get('[data-testid="burger-constructor"]').within(() => {
            cy.get('[data-testid="constructor-orderButton"]').click();
        });

        cy.wait('@orderBurger');

        cy.get('[data-testid="modal"]').within(() => {
            cy.get('[data-testid="modal-close"]').click();
        });

        cy.get('[data-testid="modal"]').should('not.exist');
        cy.get('[data-testid="burger-constructor"]').within(() => {
            cy.contains('Выберите булки').should('exist');
            cy.contains('Выберите начинку').should('exist');
        });
    });
});
