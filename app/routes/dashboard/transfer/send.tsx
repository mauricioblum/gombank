import { redirect } from '@remix-run/node';

export async function action({ request }: { request: Request }) {
  console.log('action called');
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
    return redirect('/dashboard/transfer?error=true');
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
    return redirect('/dashboard/transfer?error=true');
  }

  return redirect('/dashboard?receipt=true');
}
