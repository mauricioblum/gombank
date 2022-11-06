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
  console.log('🚀 ~ action ~ walletId', walletId);
  const beneficiary = formData.get('beneficiary')?.toString();
  console.log('🚀 ~ action ~ beneficiary', beneficiary);
  const accountNumber = formData.get('accountNumber')?.toString();
  console.log('🚀 ~ action ~ accountNumber', accountNumber);
  const balance = formData.get('balance')?.toString();
  console.log('🚀 ~ action ~ balance', balance);
  const iban = formData.get('iban')?.toString();
  console.log('🚀 ~ action ~ iban', iban);
  const amount = formData.get('amount')?.toString();
  console.log('🚀 ~ action ~ amount', amount);
  const currency = formData.get('currency')?.toString();
  console.log('🚀 ~ action ~ currency', currency);

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
  return redirect('/dashboard/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
