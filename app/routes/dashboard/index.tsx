import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { Button, TransactionsTable } from '../../components';
import { useDialog } from '../../providers/DialogProvider';
import { useToast } from '../../providers/ToastProvider';
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

export type DashboardLoaderData = {
  user: {
    id: string;
    accountNumber: string;
    name: string;
    wallets: Wallet[];
  };
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const receipt = url.searchParams.get('receipt');
  const error = url.searchParams.get('error');
  const session = await requireUserSession(request);
  const userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get('userId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + session.get('token'),
    },
  });
  const { user } = (await userInfoRequest.json()) as DashboardLoaderData;

  return json({
    user,
    receipt,
    error,
  });
}

const ReceiptDialog = ({
  transaction,
  closeDialog,
}: {
  transaction?: DashboardLoaderData['user']['wallets'][0]['transactions'][0];
  closeDialog: () => void;
}) => {
  if (!transaction) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-4">
      <h3 className="text-center font-bold text-xl mb-6">Receipt of your Transfer</h3>

      <div className="text-left">
        <p>
          <b>Transaction ID:</b> {transaction.id}
        </p>
        <p>
          <b>Beneficiary:</b> {transaction.beneficiary}
        </p>
        <p>
          <b>IBAN:</b> {transaction.iban}
        </p>
        <p>
          <b>Amount:</b> {transaction.amount.value} {transaction.amount.currency}
        </p>
        <p>
          <b>Date:</b> {transaction.date}
        </p>
      </div>
      <div className="mt-2">
        <Button
          onClick={() => {
            window.location.replace('/dashboard/');
            closeDialog();
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default function DashboardIndex() {
  const { user, receipt, error } = useLoaderData<typeof loader>();
  const { openDialog, closeDialog } = useDialog();
  const { showToast } = useToast();

  const allTransactions = user.wallets.flatMap((info) => info.transactions).filter(Boolean);
  const lastTransaction = allTransactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0];

  useEffect(() => {
    if (receipt) {
      openDialog(
        <ReceiptDialog closeDialog={closeDialog} transaction={lastTransaction} />,
        '/dashboard/'
      );
      showToast({ type: 'success', message: 'Transfer completed sucessfully!' });
    } else if (error) {
      showToast({ type: 'error', message: 'Your transfer was not suceeded! Try again later.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt, error]);

  return (
    <div className="content p-6">
      <h1 className="font-bold text-white text-2xl mb-4">Dashboard</h1>
      <div className="bg-white rounded-xl p-5 drop-shadow-lg mb-4">
        <h3 className="font-bold">Overview</h3>
        <p>Name: {user?.name}</p>
        <p>Account: {user?.accountNumber}</p>
      </div>
      <div className="bg-white rounded-xl p-5 drop-shadow-lg">
        <h3 className="font-bold">Recent transactions:</h3>
        <TransactionsTable transactions={allTransactions} />
      </div>
    </div>
  );
}
