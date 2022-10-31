import { redirect } from '@remix-run/node'; // or "@remix-run/cloudflare"
import { getUserSession } from './utils/session.server';

export async function requireUserSession(request: Request) {
  // get the session
  const session = await getUserSession(request);

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  if (!session.has('userId')) {
    // if there is no user session, redirect to login
    throw redirect('/');
  }

  return session;
}
