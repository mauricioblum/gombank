import type { LinksFunction } from '@remix-run/node';
import { Button } from '../components';
import styles from '../styles/tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-500">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Login To Your Account
        </div>

        <div className="mt-10">
          <form action="#">
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

            <Button className="w-full">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
