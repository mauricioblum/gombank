import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type database from '../../../db/db.json';
import fs from 'fs';
import path from 'path';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  try {
    const dbFile = await fs.promises.readFile(path.resolve(`${__dirname}/../db/db.json`), {
      encoding: 'utf8',
    });
    const db = JSON.parse(dbFile) as typeof database;
    const users = db.users;
    const { accountNumber, password } = body;

    const user = users.find((user) => {
      return user.accountNumber === accountNumber;
    });
    if (user && user.password === password) {
      const foundUser = { ...user, password: undefined };
      return json({ user: foundUser });
    } else {
      return json({ error: 'Account not found or incorrect password!' });
    }
  } catch (err) {
    return json({ error: 'Unknown error!' });
  }
};
