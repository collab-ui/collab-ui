describe('@collab-ui/core', function() {
  it('snapshot of editable-textfield', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/editable-textfield`)
      .get('.cui-editable-textfield__button')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});
