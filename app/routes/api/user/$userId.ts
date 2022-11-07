import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type database from '../../../db/db.json';
import fs from 'fs';
import path from 'path';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const dbFile = await fs.promises.readFile(path.resolve(`${__dirname}/../app/db/db.json`), {
      encoding: 'utf8',
    });
    const db = JSON.parse(dbFile) as typeof database;

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
    return json({ error: 'Unknown error!', err });
  }
};
