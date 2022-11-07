describe('Transfer page', () => {
  beforeEach(() => {
    cy.login();
    cy.visitAndCheck('/dashboard/transfer');
  });

  it('should be in correct page', () => {
    cy.get('.content > .font-bold').should('have.text', 'Transfer');
  });

  it('transfer to an IBAN', () => {
    cy.findByPlaceholderText('Beneficiary name').type('Test Beneficiary');
    cy.findByPlaceholderText('IBAN').type('LU100000000000000000');
    cy.findByPlaceholderText('Enter an amount').type('50');
    cy.get('button[type="submit"]').click();
    cy.get('dialog > div.w-full > div > h3').should('have.text', 'Receipt of your Transfer');
  });

  after(() => {
    cy.visit('/sign-out');
  });
});
