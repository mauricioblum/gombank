import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { TransactionsTable, WalletCard } from '../../components';
import { loader as indexLoader } from './index';

export async function loader({ request }: { request: Request }) {
  return indexLoader({ request });
}

export default function MyWallets() {
  const data = useLoaderData<typeof indexLoader>();
  const [selectedWallet, setSelectedWallet] = useState(data.wallets[0] || null);

  return (
    <div className="content p-6">
      <h1 className="font-bold text-white text-2xl mb-4">My Wallets</h1>

      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full ">
        {data.wallets.map((wallet) => (
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
      </div>
      <h3 className="text-white mt-2 text-lg font-bold">Transactions</h3>
      <div className="mt-2 w-full rounded-xl p-5 bg-white min-h-[300px]">
        <TransactionsTable transactions={selectedWallet?.transactions ?? []} />
      </div>
    </div>
  );
}
