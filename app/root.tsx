import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { DialogProvider } from './providers/DialogProvider';
import styles from './styles/tailwind.css';
import { destroySession, getMessageSession } from './utils/message.server';
import type { ToastMessage } from './utils/session.server';

type LoaderData = {
  toastMessage: ToastMessage | null;
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'GomBank',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getMessageSession(request.headers.get('cookie'));

  const toastMessage = session.get('toastMessage') as ToastMessage;

  if (!toastMessage) {
    return json<LoaderData>({ toastMessage: null });
  }

  if (!toastMessage.type) {
    throw new Error('Message should have a type');
  }

  console.log('Loader root called?');
  return json({
    toastMessage,
    headers: { 'Set-Cookie': await destroySession(session) },
  });
};

export default function App() {
  const { toastMessage } = useLoaderData<LoaderData>();

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const { message, type } = toastMessage;

    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        throw new Error(`${type} is not handled`);
    }
  }, [toastMessage]);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <DialogProvider>
          <Outlet />
        </DialogProvider>
        <Toaster
          toastOptions={{
            success: {
              icon: null,
              style: {
                background: '#65a30d',
                color: '#fff',
                fontWeight: 'bold',
              },
            },
            error: {
              icon: null,
              style: {
                background: '#b91c1c',
                color: '#fff',
                fontWeight: 'bold',
              },
            },
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
