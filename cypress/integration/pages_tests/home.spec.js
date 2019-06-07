/// <reference types="Cypress" />

describe('Home Page', function() {
  it('Contain H1', function() {
    cy.visit('/');
    cy.get('h1.header-text').should('have.text', 'Home');
    cy.get('button').click();
    cy.get('h1.header-text').should('have.text', 'Hello');
    cy.get('button').click();
    cy.get('h1.header-text').should('have.text', 'Home');
  });
});
