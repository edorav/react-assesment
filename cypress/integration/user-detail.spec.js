describe('user detail app', () => {
  beforeEach(() => {
    cy.visit('/user/1');
  });

  it('should select a new friend', () => {
    cy.get('.btn').contains('Select friend').click();

    cy.get('.user-select').eq(0).click();
    // asserts
    cy.get('.single-user').its('length').should('eq', 1);
  });

  it('should create a new friend', () => {
    cy.get('.btn').contains('New user').click();

    cy.get('.sidebar input[id="fullname"]').type('Nome completo');
    cy.get('.sidebar input[id="username"]').type('username');
    cy.get('.sidebar .btn').contains('Save').click();

    cy.get('.single-user').its('length').should('eq', 1);
  });
});
