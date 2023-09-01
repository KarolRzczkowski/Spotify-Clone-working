// components/Sidebar.tsx
'use client'
import React, { useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation'; // Importuj useRouter z next/router
import Box from './Box';
import Sidebaritem from './Sidebaritem';
import Library from './Library';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  const handleSearchClick = () => {
    router.push('/search');
  };
  
  return (
    <div className={twMerge(`flex h-full w-100px z-10`)}>
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
            <div
              className={`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1 ${
                router.pathname !== '/search' ? 'text-white' : ''
              }`}
              onClick={() => router.push('/')}
            >
              <HiHome size={26} />
              <p className='truncate w-full'>Home</p>
            </div>
            <div
              className={`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1 ${
                router.pathname === '/search' ? 'text-white' : ''
              }`}
              onClick={handleSearchClick}
            >
              <BiSearch size={26} />
              <p className='truncate w-full'>Search</p>
            </div>
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library minimized={sidebarMinimized} />
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
          text-white hover:bg-green-800
          transition-all cursor-pointer
          opacity-[80%]
          hidden md:block 
          items-center
        `)}
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default Sidebar;
