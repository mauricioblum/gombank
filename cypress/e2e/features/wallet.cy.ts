describe('Add Wallet page', () => {
  before(() => {
    cy.login();
    cy.visitAndCheck('/dashboard/my-wallets');
  });

  it('should be in correct page', () => {
    cy.get('.grid > .bg-lime-600').should('be.visible');
  });

  it('should open add wallet modal', () => {
    cy.findByText('Add new Wallet').click();

    cy.get('dialog').should('have.attr', 'open');
  });

  it('should add a New Wallet', () => {
    cy.login();
    cy.visitAndCheck('/dashboard/my-wallets');
    cy.findByText('Add new Wallet').click();
    cy.get('dialog').get('input[name="walletName"]').type('Test Wallet');
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(4) > .flex-col > .flex > p').should('have.text', 'Test Wallet');
  });

  after(() => {
    cy.visit('/sign-out');
  });
});
