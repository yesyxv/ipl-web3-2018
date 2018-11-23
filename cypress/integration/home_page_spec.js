/// <reference types="Cypress" />

describe('The Home Page', function() {
    it('successfully loads', function() {
      cy.visit('/')
      cy.get('#formHorizontalEmail').type('leleux@vinci.be')
      cy.get('#formHorizontalPassword').type('leleux')
    })
})