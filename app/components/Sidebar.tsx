import { NavLink } from '@remix-run/react';
import React from 'react';

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
          className={({ isActive }) =>
            isActive
              ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-lime-400 font-bold'
              : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-lime-600 text-white font-bold'
          }
        >
          {item.title}
        </NavLink>
      ))}
    </aside>
  );
};
