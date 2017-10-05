import React from 'react';


describe('Test CSV Header Checker', function() {
  it('Uploads a CSV that fails and one that passes', function() {
    cy.visit('http://localhost:3000/')

    cy.get('input.username').type('cypress')
    cy.get('input.password').type('cypress')
    cy.contains('Log In!').click()
    cy.get('.create').click()
    cy.get('input.lesson-name').type('Cypress')
    cy.get('input.lesson-description').type('Cypress')
    cy.contains('Make Lesson').click()
    cy.contains('Go To Slide Creator').click()
    cy.contains('Upload Slides Via CSV').click()
    cy.on('window:alert', (event) => {
      assert.equal(event, 'Incorrect Headers')
    })
    cy.get('.fail').click()
      .then(() => cy.removeAllListeners())
      .then(() => {
        cy.on('window:alert', (event) => {
          assert.equal(event, 'Name of Slide Cannot be Blank')
        })
      })
    cy.get('.pass').click()
  })
})
