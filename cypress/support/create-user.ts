// Use this to create a new user and login with that user
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/create-user.ts
// and it will log out the cookie value you can use to interact with the server
// as that new user.

import { installGlobals } from '@remix-run/node';
import { parse } from 'cookie';
import { createUserSession } from '../../app/utils/session.server';

installGlobals();

async function createAndLogin() {
  const response = await createUserSession('002', '/dashboard');

  const cookieValue = response.headers.get('Set-Cookie');
  if (!cookieValue) {
    throw new Error('Cookie missing from createUserSession response');
  }
  const parsedCookie = parse(cookieValue);
  // we log it like this so our cypress command can parse it out and set it as
  // the cookie value.
  console.log(
    `
<cookie>
  ${parsedCookie['GomBank_session_new']}
</cookie>
  `.trim()
  );
}

createAndLogin();
