
function addMessage(message){
	cy.request({
  			method:'POST',
  			url:'/api/messages',
  			headers: {
		    'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWJiZmMzM2ZiYWQ2OTEwMmJkNGQ5ZDI5IiwiZXhwIjoxNTQzMTE1MTgxNTYxLCJpYXQiOjE1NDMwNzE5ODF9.QM6bVFgv8WiFDV0xC95R-z2Om9hPl1HREVV2fxGDtrs',
		  	},
		  	body:{
		  		'message':message
		  	}

  		}).then((resp)=>{
  			console.log(resp)
  		})
}
describe('The Home Page', function() {
	beforeEach(() => {
      cy.visit('/')
      cy.get("#formHorizontalEmail").type('laurent.leleux@vinci.be')
      cy.get("#formHorizontalPassword").type('laurent')
      cy.get(':submit').click()
	})
	afterEach(()=>{
		 cy.get('.list-group').children().each((elt)=>{
		 	elt.find('.row > .col-4 > .btn-toolbar > .btn-danger').click()

		 })
		addMessage('Bonjour !')
		addMessage('Bonjour ça va ?')
		addMessage('Oui et toi ?')
		addMessage('Oui :)')
	})
     it('delete/add message',function(){
     	cy.get('.list-group').children().should('have.length', 4)
     	cy.get(':nth-child(2) > .row > .col-4 > .btn-toolbar > .btn-danger').click()// supp message2
     	cy.get('.list-group').children().should('have.length', 3) // 3 messages restant
     	cy.get(':nth-child(1)').contains('Bonjour !')
     	cy.get(':nth-child(2)').contains('Oui et toi ?')
     	cy.get(':nth-child(3) > .row > .col-4 > .btn-toolbar > .btn-danger').click()// supp message2
     	cy.get('.list-group').children().should('have.length', 2) // 3 messages restant



    })
}) 