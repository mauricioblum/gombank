import { useLoaderData } from '@remix-run/react';
import { TransactionsTable } from '../../components';
import { requireUserSession } from '../../session';

export type Transaction = {
  id: string;
  beneficiary: string;
  amount: { value: number; currency: string };
  date: string;
  iban: string;
};

type Wallet = {
  id: string;
  name: string;
  currency: string;
  balance: number;
  transactions: Transaction[];
};

type DashboardLoaderData = {
  user: {
    id: string;
    accountNumber: string;
    name: string;
    wallets: Wallet[];
  };
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

  return user;
}

export default function DashboardIndex() {
  const userInfo = useLoaderData<typeof loader>();
  const allTransactions = userInfo.wallets.flatMap((info) => info.transactions).filter(Boolean);

  return (
    <div className="content p-6">
      <h1 className="font-bold text-white text-2xl mb-4">Dashboard</h1>
      <div className="bg-white rounded-xl p-5 drop-shadow-lg mb-4">
        <h3 className="font-bold">Overview</h3>
        <p>Name: {userInfo?.name}</p>
        <p>Account: {userInfo?.accountNumber}</p>
      </div>
      <div className="bg-white rounded-xl p-5 drop-shadow-lg">
        <h3 className="font-bold">Recent transactions:</h3>
        <TransactionsTable transactions={allTransactions} />
      </div>
    </div>
  );
}
