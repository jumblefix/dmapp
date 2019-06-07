/// <reference types="Cypress" />

describe('Home Page', function() {
  it('Contain H1', function() {
    cy.visit('/');
    cy.get('h1').should('contain', 'Home');
  });
});
