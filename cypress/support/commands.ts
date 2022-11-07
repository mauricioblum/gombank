export {};
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a random user. Yields the user and adds an alias to the user
       *
       * @returns {typeof login}
       * @memberof Chainable
       * @example
       *    cy.login()
       * @example
       *    cy.login({ email: 'whatever@example.com' })
       */
      login: typeof login;

      /**
       * Extends the standard visit command to wait for the page to load
       *
       * @returns {typeof visitAndCheck}
       * @memberof Chainable
       * @example
       *    cy.visitAndCheck('/')
       *  @example
       *    cy.visitAndCheck('/', 500)
       */
      visitAndCheck: typeof visitAndCheck;
    }
  }
}

function login() {
  cy.then(() => {}).as('user');
  cy.exec(`npx ts-node --require tsconfig-paths/register ./cypress/support/create-user.ts`).then(
    ({ stdout }) => {
      const cookieValue = stdout
        .replace(/.*<cookie>(?<cookieValue>.*)<\/cookie>.*/s, '$<cookieValue>')
        .trim();
      cy.setCookie('GomBank_session_new', cookieValue, {
        expiry: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).getTime(),
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
      });
    }
  );
  return cy.get('@user');
}

// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url: string, waitTime: number = 1000) {
  cy.visit(url);
  cy.location('pathname').should('contain', url).wait(waitTime);
}

Cypress.Commands.add('login', login);
Cypress.Commands.add('visitAndCheck', visitAndCheck);
