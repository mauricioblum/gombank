import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import db from '../../../db.json';
import { commitSession, getMessageSession } from '../../utils/message.server';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  const session = await getMessageSession(request.headers.get('cookie'));
  try {
    const users = db.users;
    const { accountNumber, password } = body;

    const user = users.find((user) => {
      return user.accountNumber === accountNumber;
    });
    if (user && user.password === password) {
      const foundUser = { ...user, password: undefined };
      return json(
        { user: foundUser },
        {
          headers: { 'Set-Cookie': await commitSession(session) },
        }
      );
    } else {
      return json({ error: 'User not found or incorrect password!' });
    }
  } catch (err) {
    return json({ error: 'Unknown error!' });
  }
};
