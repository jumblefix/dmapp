/// <reference types="Cypress" />

describe('Home Page', () => {
  it('Contain H1', () => {
    cy.visit('/');
    cy.get('h1.header-text').should('have.text', 'Home');
    cy.get('button').click();
    cy.get('h1.header-text').should('have.text', 'Hello');
    cy.get('button').click();
    cy.get('h1.header-text').should('have.text', 'Home');
  });
});
