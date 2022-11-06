import { redirect } from '@remix-run/node';
import {
  setErrorMessage,
  commitSession,
  setSuccessMessage,
  getMessageSession,
} from '../../../utils/message.server';

export async function action({ request }: { request: Request }) {
  const session = await getMessageSession(request.headers.get('cookie'));

  const formData = await request.formData();
  const walletId = formData.get('walletId')?.toString();
  const beneficiary = formData.get('beneficiary')?.toString();
  const accountNumber = formData.get('accountNumber')?.toString();
  const balance = formData.get('balance')?.toString();
  const iban = formData.get('iban')?.toString();
  const amount = formData.get('amount')?.toString();
  const amountToDebit = formData.get('amountToDebit')?.toString();
  const currency = formData.get('currency')?.toString();

  const notEnoughFunds = Number(amount) > Number(balance);

  if (notEnoughFunds) {
    setErrorMessage(session, 'Not enough funds available in this account!');
    return redirect('/dashboard/transfer/', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  try {
    await fetch(`${process.env.APP_URL}/api/addTransaction`, {
      method: 'POST',
      body: JSON.stringify({
        accountNumber,
        walletId,
        beneficiary,
        iban,
        amount,
        amountToDebit,
        currency,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    setErrorMessage(session, 'Error while trying to send transaction! Try again later.');
    return redirect('/dashboard/transfer/', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  setSuccessMessage(session, 'You transfered money with success!');
  return redirect('/dashboard?receipt=true', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
