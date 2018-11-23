/// <reference types="Cypress" />

describe('Login', function() {
    beforeEach(() => {
      cy.visit('/')
      cy.get("#formHorizontalEmail").as("email")
      cy.get("#formHorizontalPassword").as("password")
    })

    it('successfully connected', () => {
      cy.get("@email").type("laurent.leleux@vinci.be")
      cy.get("@password").type("laurent")
      cy.screenshot()
      cy.get(".btn").contains("Sign in").click()
      cy.url().should("eq", "http://localhost:3030/#/messages")
    })

    it('incorrect password', () => {
      cy.get("@email").type("leleux@vinci.be")
      cy.get("@password").type("laurentis")
      cy.get(".btn").contains("Sign in").click()
      cy.url().should("eq", "http://localhost:3030/#/messages")
    })
})