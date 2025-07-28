describe('Contact Form Integration', () => {

  it('should submit the form and show a success message', () => {

    cy.visit('http://localhost:4200');
 
    cy.get('input#title').type('Mr');

    cy.get('input#firstName').type('John');

    cy.get('input#lastName').type('Doe');

    cy.get('input#phoneNumber').type('012345678901');

    cy.get('input#email').type('john.doe@example.com');
 
    cy.contains('button', 'Submit').click();
 
    // Check for the success message

    cy.contains('Form submitted successfully!').should('be.visible');

  });

});
 