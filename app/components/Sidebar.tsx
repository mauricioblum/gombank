import { NavLink, useMatches } from '@remix-run/react';
import React, { useState } from 'react';
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

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        <details
          open={open}
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <summary onClick={() => setOpen(!open)} className="cursor-pointer pb-4 pt-6 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </summary>
          <div className="bg-neutral-800 w-screen h-screen flex flex-col items-center ">
            <aside>
              {items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  prefetch="intent"
                  onClick={() => {
                    console.log('navlin');
                    setOpen(false);
                  }}
                  className={classNames(
                    'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer font-bold text-xl',
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
          </div>
        </details>
      </div>
      <aside className="hidden lg:block h-auto min-h-screen lg:left-0 p-2 min-w-[300px] overflow-y-auto text-center bg-neutral-800 drop-shadow-md">
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
    </>
  );
};
