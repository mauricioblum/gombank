import type { LoaderFunction } from '@remix-run/node';
import { logout } from '../utils/session.server';
import fs from 'fs';
import path from 'path';

async function resetDatabase() {
  const dbFile = await fs.promises.readFile(path.resolve(`${__dirname}/../../app/db/db.json`), {
    encoding: 'utf8',
  });
  const seedFile = await fs.promises.readFile(path.resolve(`${__dirname}/../../app/db/seed.json`), {
    encoding: 'utf8',
  });
  if (dbFile && seedFile) {
    await fs.promises.writeFile(path.resolve(`${__dirname}/../../app/db/db.json`), seedFile);
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await resetDatabase();
  } catch (err) {
    console.log(err);
  }

  return logout(request);
};
