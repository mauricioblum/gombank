import { NavLink, useMatches } from '@remix-run/react';
import React from 'react';
import classNames from 'classnames';

interface SidebarItem {
  id: string;
  title: string;
  to: string;
}

interface SidebarProps {
  sidebarTitle: string;
  items: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarTitle, items }) => {
  const matches = useMatches();

  const currentPath = matches.at(-1)?.pathname ?? '';

  return (
    <aside className="h-screen lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-neutral-800 drop-shadow-md">
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 ml-3">{sidebarTitle}</h1>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]" />
      </div>

      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          prefetch="intent"
          className={classNames(
            'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer font-bold',
            {
              'text-lime-400': currentPath === item.to,
              'text-white hover:bg-lime-600': currentPath !== item.to,
            }
          )}
        >
          {item.title}
        </NavLink>
      ))}
    </aside>
  );
};
