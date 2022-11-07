import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import fs from 'fs';
import path from 'path';
import type database from '../../db/db.json';
import { randomId } from '../../utils/uuid.server';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  try {
    const dbFile = await fs.promises.readFile(path.resolve(`${__dirname}/../../app/db/db.json`), {
      encoding: 'utf8',
    });
    const db = JSON.parse(dbFile) as typeof database;
    const users = db.users;
    const { accountNumber, walletId, beneficiary, iban, currency, amount, amountToDebit } = body;

    const user = users.find((user) => {
      return user.accountNumber === accountNumber;
    });
    if (user) {
      const newUser = { ...user };
      const userWallets = newUser.wallets;

      const wallet = userWallets?.find((w) => w.id === walletId);
      const walletIndex = userWallets?.findIndex((w) => w.id === walletId) ?? -1;

      if (wallet) {
        const walletTransactions = wallet.transactions ? [...wallet.transactions] : [];

        const newTransaction = {
          id: randomId(),
          beneficiary,
          amount: {
            value: amount,
            currency,
          },
          date: new Date().toISOString(),
          iban,
        };

        walletTransactions.push(newTransaction);

        wallet.balance = wallet.balance - amountToDebit;

        const currentWallets = db.users[db.users.indexOf(user)].wallets;

        if (currentWallets && walletIndex !== -1) {
          currentWallets[walletIndex].transactions = walletTransactions;
        }
      }

      const newDB = JSON.stringify(db, null, 2);

      try {
        await fs.promises.writeFile(path.resolve(`${__dirname}/../../app/db/db.json`), newDB);
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
