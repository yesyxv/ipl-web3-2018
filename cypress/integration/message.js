
function addMessage(message,token){
	cy.request({
  			method:'POST',
  			url:'/api/messages',
  			headers: {
		    'authorization':token
		  	},
		  	body:{
		  		'message':message
		  	}

  		}).then((resp)=>{
  			console.log(resp)
  		})
}
describe('The message page', function() {
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
    var JWT=localStorage.getItem('JWT').split('"')[1]
		addMessage('Bonjour !',JWT)
		addMessage('Bonjour ça va ?',JWT)
		addMessage('Oui et toi ?',JWT)
		addMessage('Oui :)',JWT)
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