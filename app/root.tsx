import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Progress } from './components';
import { DialogProvider } from './providers/DialogProvider';
import { ToastProvider } from './providers/ToastProvider';
import styles from './styles/tailwind.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'GomBank',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Progress />
        <ToastProvider>
          <DialogProvider>
            <Outlet />
          </DialogProvider>
        </ToastProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
