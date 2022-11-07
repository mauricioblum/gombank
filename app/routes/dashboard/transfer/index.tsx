import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { Button, Select } from '../../../components';

import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useMemo } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { requireUserSession } from '../../../session';
import { formatCurrency } from '../../../utils/formatCurrency';
import type { DashboardLoaderData } from '../index';

type Rates =
  | {
      [key: string]: string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const currency = formData.get('currency')?.toString();
    const rate = formData.get('rate')?.toString();
    const exchangeRatesRequest = await fetch(
      `${process.env.EXCHANGE_RATES_API_URL}/${currency}/${rate}.json`,
      {
        method: 'GET',
      }
    );
    const rates = (await exchangeRatesRequest.json()) as Rates;
    return json({
      rates,
    });
  } catch (err) {
    console.log('🚀 ~ fetchRates ~ err', err);
    return json({ rates: null });
  }
};

export async function loader({ request }: { request: Request }) {
  const session = await requireUserSession(request);

  const userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get('userId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + session.get('token'),
    },
  });
  const { user } = (await userInfoRequest.json()) as DashboardLoaderData;

  const currenciesRequest = await fetch(`${process.env.EXCHANGE_RATES_API_URL}.min.json`, {
    method: 'GET',
  });

  const currencies = await currenciesRequest.json();
  const currencyMap = Object.keys(currencies);

  return json({
    user,
    currencies: currencyMap,
  });
}

export default function Transfer() {
  const { user, currencies } = useLoaderData<typeof loader>();
  const [selectedWallet, setSelectedWallet] = useState(user.wallets[0] || null);
  const [selectedCurrency, setSelectedCurrency] = useState('eur');
  const [amount, setAmount] = useState<string>('');

  const fetcher = useFetcher();
  const rates = fetcher.data?.rates as Rates;

  const isExchange = useMemo(() => {
    return (
      amount &&
      Number(amount) > 0 &&
      selectedWallet &&
      selectedWallet.currency.toLowerCase() !== selectedCurrency
    );
  }, [amount, selectedCurrency, selectedWallet]);

  const currentRate = useMemo(() => {
    return rates?.[selectedCurrency] ?? 0;
  }, [rates, selectedCurrency]);

  const getExchangeRate = useCallback(
    (amount?: string) => {
      if (currentRate && amount) {
        const numberAmount = parseFloat(amount);
        const numberRate = parseFloat(currentRate);
        return numberAmount / numberRate;
      }
      return 1;
    },
    [currentRate]
  );

  return (
    <div className="content p-6">
      <h1 className="font-bold text-white text-2xl mb-4">Transfer</h1>

      <div className="mt-2 w-full rounded-xl p-5 bg-white min-h-[300px] min-w-[380px]">
        <Form
          action="/dashboard/transfer/send"
          method="post"
          onSubmit={(e) => {
            if (amount && Number(amount) <= 0) {
              e.preventDefault();
            }
          }}
        >
          <p className="mb-2">Select the wallet</p>
          <Select
            name="wallet"
            items={user.wallets.map((item) => ({
              id: item.id,
              value: item.name,
            }))}
            onChange={(value) => {
              const wallet = user.wallets.find((wallet) => wallet.name === value);
              if (wallet) {
                setSelectedWallet(wallet);
                fetcher.submit(
                  {
                    currency: wallet.currency.toLowerCase(),
                    rate: selectedCurrency,
                  },
                  { method: 'post' }
                );
              }
            }}
          />
          <input type="hidden" name="walletId" value={selectedWallet.id} />
          <input type="hidden" name="accountNumber" value={user.accountNumber} />
          <input
            type="hidden"
            name="amountToDebit"
            value={isExchange ? getExchangeRate(amount) : amount}
          />
          <p className="mt-2 mb-1">
            Balance: <b>{formatCurrency(selectedWallet.balance, selectedWallet.currency)}</b>
          </p>
          <input type="hidden" name="balance" value={selectedWallet.balance} />
          <input
            type="hidden"
            name="amount"
            value={isExchange ? getExchangeRate(amount) : amount}
          />
          <p className="mt-2 mb-1">Beneficiary name</p>
          <input
            placeholder="Beneficiary name"
            name="beneficiary"
            required
            className="flex h-10 w-full cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600"
          />
          <p className="mt-2 mb-1">IBAN</p>
          <input
            placeholder="IBAN"
            name="iban"
            maxLength={20}
            required
            pattern="[A-Z]{2}\d{13,32}|(?=.{18,42}$)[A-Z]{2}\d{2}( )(\d{4}\1){2,7}\d{1,4}"
            className="flex h-10 w-full cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600"
          />
          <p className="mt-2 mb-1">Amount</p>
          <div className="flex items-center">
            <CurrencyInput
              required
              autoComplete="off"
              className="flex h-10 w-full cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600"
              placeholder="Enter an amount"
              decimalsLimit={2}
              onValueChange={(value, name) => value && setAmount(value)}
              value={amount}
            />
            <div className="ml-2">
              <Select
                name="currency"
                items={
                  currencies?.map((currency) => ({
                    id: currency,
                    value: currency.toUpperCase(),
                  })) ?? []
                }
                defaultValue={{
                  id: selectedWallet.currency.toLowerCase(),
                  value: selectedWallet.currency,
                }}
                onChange={(value) => {
                  setSelectedCurrency(value.toLowerCase());
                  fetcher.submit(
                    {
                      currency: selectedWallet.currency.toLowerCase(),
                      rate: value.toLowerCase(),
                    },
                    { method: 'post' }
                  );
                }}
              />
            </div>
          </div>
          {amount && fetcher.state !== 'idle' && (
            <div className="mt-2 mb-1">
              <p>Loading rates...</p>
            </div>
          )}
          {isExchange && amount && fetcher.state === 'idle' && (
            <div className="mt-2 mb-1">
              <p>
                You will pay:{' '}
                <b>{formatCurrency(getExchangeRate(amount), selectedWallet.currency)}</b>
              </p>
              <p>
                Beneficiary will receive:{' '}
                <b>{formatCurrency(parseFloat(amount), selectedCurrency)}</b>
              </p>
              <p className="mt-1">Current rates:</p>
              <p>
                1 {selectedWallet.currency} = {currentRate} {selectedCurrency.toUpperCase()}
              </p>
              <p className="mt-1">{`Date of this rate: ${rates?.date}`}</p>
            </div>
          )}

          <Button disabled={amount ? Number(amount) <= 0 : true} className="mt-4" type="submit">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}
