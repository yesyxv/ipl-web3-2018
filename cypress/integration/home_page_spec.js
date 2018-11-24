function connexionOk(){
	    cy.visit('/')
	    cy.get('@email').type('laurent.leleux@vinci.be')
	    cy.get('@password').type('laurent')
		cy.get(':submit').click().should(() => {
			expect(localStorage.getItem('JWT')).not.to.be.null
		  	expect(localStorage.getItem('JWT')).not.to.eq('"FAKE JWT"')
		})
    
}
describe('The Home Page', function() {
	beforeEach(() => {
      cy.visit('/')
      cy.get("#formHorizontalEmail").as("email")
      cy.get("#formHorizontalPassword").as("password")
	})
    it('incorrect password', function() {
	    cy.visit('/')
	    cy.get('@email').type('laurent.leleux@vinci.be')
	    cy.get('@password').type('lauredt')
		cy.get(':submit').click().should(() => {
		  	expect(localStorage.getItem('JWT')).to.eq('"FAKE JWT"')
		})
    })
    it('successfully connected', function() {
	   connexionOk();
    })
    it('successful logout', function(){
    	connexionOk();
    	cy.get('.btn-outline-warning').click().should(()=>{ // bouton de déconnexion
		  	expect(localStorage.getItem('JWT')).to.be.null
    	})
    })
})