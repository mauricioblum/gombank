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
  const wallet = formData.get('wallet')?.toString();
  const beneficiary = formData.get('beneficiary')?.toString();
  const balance = formData.get('balance')?.toString();
  console.log('🚀 ~ action ~ balance', balance);
  const iban = formData.get('iban')?.toString();
  const amount = formData.get('amount')?.toString();
  console.log('🚀 ~ action ~ amount', amount);
  const currency = formData.get('currency')?.toString();

  const notEnoughFunds = Number(amount) > Number(balance);

  if (notEnoughFunds) {
    setErrorMessage(session, 'Not enough funds available in this account!');
    return redirect('/dashboard/transfer/', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  setSuccessMessage(session, 'You transfered money with success!');
  return redirect('/dashboard/tra', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
