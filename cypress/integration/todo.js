function checkInViewPort(item,withMax,heightMax){
  expect(item[0].getBoundingClientRect().left).to.be.greaterThan(0) 
  expect(item[0].getBoundingClientRect().left).to.be.lessThan(withMax)
  expect(item[0].getBoundingClientRect().top).to.be.greaterThan(0) 
  expect(item[0].getBoundingClientRect().bottom).to.be.lessThan(heightMax) 
}
function checkOutViewPort(item,heightMax){
  expect(item[0].getBoundingClientRect().bottom).to.be.greaterThan(heightMax) 
}
describe('The Todo page', function() {
	beforeEach(() => {
      cy.visit('/')
      cy.get("#formHorizontalEmail").type('laurent.leleux@vinci.be')
      cy.get("#formHorizontalPassword").type('laurent')
      cy.get(':submit').click()
      cy.url().should('eq', 'http://localhost:3030/#/messages')
      cy.visit('http://localhost:3030/#/todo')
      cy.get('.form-group > .form-control').type("Réaliser des tests")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.form-group > .form-control').type("Push les tests sur github")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.form-group > .form-control').type("Lancer l'intégration continue")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.form-group > .form-control').type("Vérifier le résultat")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.list-group').children().should('have.length', 4)
      cy.get('.list-group > :nth-child(1)').as('todo1')
	})
  it('add todo on macbook-15',function(){
      cy.viewport('macbook-15')
      // vérification que le dernier todo est visible dans mon viewPort
      cy.get('.list-group > :nth-child(4)').as('todo4')

      cy.get('@todo1').should(todo=>{
        checkInViewPort(todo,1440,900)
      })
      cy.get('@todo4').should(todo=>{
        checkInViewPort(todo,1440,900)
      })
  })
  it('add todo on Iphone-6',function(){
      cy.viewport('iphone-6')
      cy.get('.form-group > .form-control').type("task 1")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.form-group > .form-control').type("task 2")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.form-group > .form-control').type("task 3")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.form-group > .form-control').type("task 4")
      cy.get('.row > :nth-child(1) > form > .btn').click()
      cy.get('.list-group > :nth-child(8)').as('todo8')
      cy.get('@todo1').should(todo=>{
        checkInViewPort(todo,375,667)
      })
      cy.get('@todo8').should(todo=>{// sort du viewport Iphone 6
        checkOutViewPort(todo,667)
      })
  })

}) 