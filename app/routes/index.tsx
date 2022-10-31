import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from '../components';
import { createUserSession, getUserSession, login } from '../utils/session.server';

function validateUrl(url: any) {
  console.log(url);
  let urls = ['/', '/login'];
  if (urls.includes(url)) {
    return url;
  }
  return '/dashboard';
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accountNumber = formData.get('accountNumber')?.toString();
  const password = formData.get('password')?.toString();
  const redirectTo = validateUrl(formData.get('redirectTo') || '/dashboard');

  if (!accountNumber || !password) {
    return null;
  }
  const data = await login({ accountNumber, password });

  if (!data || data.error) {
    return json(
      {
        error: data?.error || 'Invalid credentials',
      },
      { status: 401 }
    );
  }

  return createUserSession(data.user.id, redirectTo);
};

export async function loader({ request }: { request: Request }) {
  const session = await getUserSession(request);

  if (session && session.has('userId')) {
    return redirect('/dashboard');
  }
  return null;
}

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-500">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Login To Your Account
        </div>

        <div className="mt-10">
          <Form method="post">
            <div className="flex flex-col mb-6">
              <label
                htmlFor="accountNumber"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Account Number:
              </label>
              <input
                id="accountNumber"
                type="number"
                name="accountNumber"
                className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-neutral-700"
                placeholder="Account Number"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-neutral-700"
                placeholder="Password"
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
