import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DashboardLoaderData } from '.';
import { Button, Select, TransactionsTable, WalletCard } from '../../components';
import { useDialog } from '../../providers/DialogProvider';
import { requireUserSession } from '../../session';
import {
  commitSession,
  getMessageSession,
  setErrorMessage,
  setSuccessMessage,
} from '../../utils/message.server';

export async function loader({ request }: { request: Request }) {
  const currenciesRequest = await fetch(`${process.env.EXCHANGE_RATES_API_URL}.min.json`, {
    method: 'GET',
  });

  const currencies = await currenciesRequest.json();
  const currencyMap = Object.keys(currencies);

  const session = await requireUserSession(request);
  const userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get('userId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + session.get('token'),
    },
  });
  const { user } = (await userInfoRequest.json()) as DashboardLoaderData;

  return {
    user,
    currencies: currencyMap,
  };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const walletName = formData.get('walletName')?.toString();
  const currency = formData.get('currency')?.toString();
  const accountNumber = formData.get('accountNumber')?.toString();
  const session = await getMessageSession(request.headers.get('cookie'));

  try {
    const newWalletUserRequest = await fetch(`${process.env.APP_URL}/api/addWallet`, {
      method: 'POST',
      body: JSON.stringify({
        name: walletName,
        currency,
        accountNumber,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    setSuccessMessage(session, 'Wallet added successfully!');
    const { user } = (await newWalletUserRequest.json()) as DashboardLoaderData;
    return json(
      {
        user,
      },
      {
        headers: { 'Set-Cookie': await commitSession(session) },
      }
    );
  } catch (err) {
    console.log(err);
    setErrorMessage(session, 'Erro adding Wallet, please try again!');
    return redirect('/dashboard/my-wallets', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }
}

const DialogContent = ({
  currencies,
  accountNumber,
  closeDialog,
}: {
  currencies: string[];
  closeDialog: () => void;
  accountNumber: string;
}) => {
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const isAdding = transition.state === 'submitting';

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-4">
      <h3 className="text-center font-bold text-xl  mb-6">Add a new Wallet</h3>
      <Form
        ref={formRef}
        onSubmit={() => {
          closeDialog();
        }}
        action="/dashboard/my-wallets/"
        method="post"
      >
        <div>
          <p className="text-left  mb-0.5">Wallet Name</p>
          <input
            className="flex h-10 w-64 cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600"
            type="text"
            name="walletName"
            required
            minLength={2}
            placeholder="Wallet Name"
          />
          <input type="hidden" name="accountNumber" value={accountNumber} />
        </div>
        <div className="w-64 mt-2">
          <p className="text-left  mb-0.5">Currency</p>
          <Select
            name="currency"
            items={
              currencies?.map((currency) => ({
                id: currency,
                value: currency.toUpperCase(),
              })) ?? []
            }
            defaultValue={{
              id: 'eur',
              value: 'EUR',
            }}
          />
        </div>
        <Button type="submit" className="mt-4">
          Add Wallet
        </Button>
      </Form>
    </div>
  );
};

export default function MyWallets() {
  const { user: loaderUser, currencies } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();

  const user = useMemo(() => {
    return data?.user || loaderUser;
  }, [loaderUser, data]);

  const { openDialog, closeDialog } = useDialog();
  const [selectedWallet, setSelectedWallet] = useState(user.wallets[0] || null);

  const handleAddWallet = () => {
    openDialog(
      <DialogContent
        closeDialog={closeDialog}
        currencies={currencies}
        accountNumber={user.accountNumber}
      />
    );
  };

  return (
    <div className="content p-6">
      <h1 className="font-bold text-white text-2xl mb-4">My Wallets</h1>

      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full ">
        {user.wallets.map((wallet) => (
          <WalletCard
            key={wallet.id}
            walletName={wallet.name}
            balance={wallet.balance}
            currency={wallet.currency}
            active={selectedWallet.id === wallet.id}
            onClick={() => {
              setSelectedWallet(wallet);
            }}
          />
        ))}
        <div className="relative flex flex-col items-center justify-center shadow-md rounded-xl p-5 pb-3 w-64 h-44 cursor-pointer bg-white">
          <Button
            onClick={() => {
              handleAddWallet();
            }}
          >
            Add new Wallet
          </Button>
        </div>
      </div>
      <h3 className="text-white mt-2 text-lg font-bold">Transactions</h3>
      <div className="mt-2 w-full rounded-xl p-5 bg-white min-h-[300px]">
        <TransactionsTable transactions={selectedWallet?.transactions ?? []} />
      </div>
    </div>
  );
}
