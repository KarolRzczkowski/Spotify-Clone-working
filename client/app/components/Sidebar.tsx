'use client';
import React, { useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import Box from './Box';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Sidebaritem from './Sidebaritem';
import Library from './Library';


interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  
const router = useRouter() 

  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/'
    },
    {
      icon: BiSearch,
      label: 'Search',
      href: '/search',
      active: pathname === '/search',

    },
  ], [pathname]);

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  return (
    <div className={twMerge(`flex h-full w-100px`,)}>
      <div className={twMerge(`
        hidden 
        md:flex 
        flex-col 
        gap-y-2 
        bg-black 
        h-full 
        p-2
        ${sidebarMinimized ? 'w-1/4' : 'w-[200px]'} transition-all
      `)}>
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <Sidebaritem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library minimized={sidebarMinimized} /> {/* Pass the minimized prop */}
        </Box>
      </div>
      <main className={`h-full flex-1 overflow-y-auto py-2 ${sidebarMinimized ? 'w-1/2' : 'w-full'} transition-all`}>
        {children}
      </main>
      <button
  onClick={toggleSidebar}
  className={twMerge(`
    fixed bottom-4 left-4 z-10 
    p-2 rounded-full bg-black 
    text-white hover:bg-green-500
    transition-all cursor-pointer
    opacity-[80%]
    hidden md:block 
    items-ceter
  `)}
>
  Toggle Sidebar
</button>

    </div>
  );
};

export default Sidebar;