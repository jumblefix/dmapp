/// <reference types="Cypress" />

describe('Contact Page', () => {
  it('should save form', () => {
    const email = 'email@email.com';
    cy.visit('/contact');
    cy.get('#email').type(email);
    cy.get('#password').type('password');
    cy.get('#saveForm').click();
    cy.get('.saved').should('have.text', `Saved Email: ${email}`);
  });
});
