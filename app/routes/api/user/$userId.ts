import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import db from '../../../../db.json';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const users = db.users;
    const userId = params.userId;

    const user = users.find((user) => {
      return user.id === userId;
    });
    if (user) {
      const foundUser = { ...user, password: undefined };
      return json({ user: foundUser });
    } else {
      return json({ error: 'User not found' });
    }
  } catch (err) {
    return json({ error: 'Unknown error!' });
  }
};
