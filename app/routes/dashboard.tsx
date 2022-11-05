import { Outlet } from '@remix-run/react';
import { Sidebar } from '../components';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-neutral-500">
      <Sidebar
        sidebarTitle="GomBank"
        items={[
          {
            id: 'dashboard',
            title: 'Dashboard',
            to: '/dashboard',
          },
          {
            id: 'my-wallets',
            title: 'My Wallets',
            to: '/dashboard/my-wallets',
          },
          {
            id: 'transfer',
            title: 'Transfer',
            to: '/dashboard/transfer',
          },
          {
            id: 'sign-out',
            title: 'Sign Out',
            to: '/sign-out',
          },
        ]}
      />
      <Outlet />
    </div>
  );
}
