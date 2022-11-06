import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import db from '../../../db.json';
import { destroySession, getMessageSession } from '../../utils/message.server';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  const messageSession = await getMessageSession(request.headers.get('cookie'));
  try {
    const users = db.users;
    const { accountNumber, password } = body;

    const user = users.find((user) => {
      return user.accountNumber === accountNumber;
    });
    if (user && user.password === password) {
      const foundUser = { ...user, password: undefined };
      await destroySession(messageSession);
      return json({ user: foundUser });
    } else {
      return json({ error: 'Account not found or incorrect password!' });
    }
  } catch (err) {
    return json({ error: 'Unknown error!' });
  }
};
