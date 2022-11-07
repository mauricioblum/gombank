# GomBank

A proof of concept banking application.

## Tech Stack

**Client:** React, Typescript, TailwindCSS

**Server:** Remix App Server

## Features

- Wallet control (Add Wallets)
- Transfer to new accounts
- Exchange Rate for transfers between different currencies
- Responsive

## Documentation

This project uses Remix Run, for more information about it, check out [Remix Documentation](https://remix.run/docs/en/v1)

This project uses a free Github Hosted Exchange Rate API, that can be found in [https://github.com/fawazahmed0/currency-api](https://github.com/fawazahmed0/currency-api)

This projects uses a file called `db.json` to store the account and transaction information. As you use the application, this file will be modified.

You can login using the following account number and password:

```
Account Number: 1001
Password: 123
```

## Run Locally

Clone the project

Go to the project directory

Install dependencies

```bash
  npm install
```

Add the .env variables in a .env file, a .env.example file is listed so you can use it.

Start the server

```bash
  npm run dev
```

## Demo

A demo of this project can be viewed here: [https://gombank.vercel.app/](gombank.vercel.app/)

## Possible Improvements

- Better control of Wallets (edit, delete)
- View individual transactions information
- Real Database connection with persistence

## Authors

- [@mauricioblum](https://www.github.com/mauricioblum)
