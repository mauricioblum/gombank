import { useLoaderData } from '@remix-run/react';
import { requireUserSession } from '../../session';

export async function loader({ request }: { request: Request }) {
  console.log('loder call');
  const session = await requireUserSession(request);

  const userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get('userId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + session.get('token'),
    },
  });
  const { user } = await userInfoRequest.json();

  return user;
}

export default function DashboardIndex() {
  const userInfo = useLoaderData();

  return (
    <div className="content p-6">
      <h1 className="font-bold text-white text-2xl mb-4">Dashboard</h1>
      <div className="bg-white rounded p-3 drop-shadow-lg mb-2">
        <h3 className="font-bold">Overview</h3>
        <p>Name: {userInfo?.name}</p>
        <p>Account: {userInfo?.accountNumber}</p>
      </div>
      <div className="bg-white rounded p-3 drop-shadow-lg">
        <h3 className="font-bold">Recent transactions:</h3>
        <table className="table-auto min-w-full">
          <thead>
            <tr>
              <th className="pr-6 pt-4 text-left">Account</th>
              <th className="pr-6 pt-4 text-left">Amount</th>
              <th className="pr-6 pt-4 text-left">Date</th>
              <th className="pr-6 pt-4 text-left">Beneficiary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-6 text-left">Account 1</td>
              <td className="pr-6 text-left">€ 450.00</td>
              <td className="pr-6 text-left">000</td>
              <td className="pr-6 text-left">LU00 0000 0000 0000</td>
            </tr>
            <tr>
              <td className="pr-6 text-left">Account 1</td>
              <td className="pr-6 text-left">€ 1259.42</td>
              <td className="pr-6 text-left">000</td>
              <td className="pr-6 text-left">LU00 0000 0000 0000</td>
            </tr>
            <tr>
              <td className="pr-6 text-left">Account 1</td>
              <td className="pr-6 text-left">€ 51.99</td>
              <td className="pr-6 text-left">000</td>
              <td className="pr-6 text-left">LU00 0000 0000 0000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
