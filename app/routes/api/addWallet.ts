import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import fs from 'fs';
import path from 'path';
import type database from '../../db/db.json';

import { randomId } from '../../utils/uuid.server';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  try {
    const dbFile = await fs.promises.readFile(path.resolve(`${__dirname}/../app/db/db.json`), {
      encoding: 'utf8',
    });
    const db = JSON.parse(dbFile) as typeof database;
    const users = db.users;
    const { name, currency, accountNumber } = body;

    const user = users.find((user) => {
      return user.accountNumber === accountNumber;
    });
    if (user) {
      const newUser = { ...user };
      const userWallets = newUser.wallets;

      const newWallet = {
        id: randomId(),
        name,
        currency,
        balance: 10000,
        transactions: [],
      };

      userWallets?.push(newWallet);
      newUser.wallets = userWallets;
      db.users[db.users.indexOf(user)] = newUser;
      const newDB = JSON.stringify(db, null, 2);

      try {
        await fs.promises.writeFile(path.resolve(`${__dirname}/../app/db/db.json`), newDB);
      } catch (err) {
        console.log('🚀 ~ const:ActionFunction= ~ err', err);
      }

      return json({ user: newUser });
    } else {
      return json({ error: 'User not found' });
    }
  } catch (err) {
    return json({ error: 'Unknown error!' });
  }
};
